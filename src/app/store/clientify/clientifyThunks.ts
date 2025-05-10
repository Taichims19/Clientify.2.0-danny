import axios, { AxiosError } from "axios";
import {
  setCurrentPartnerId,
  setLoading,
  setError,
  setSubscriptionPlans,
  setSummaryPanel,
  setRecurrenceChart,
  setMrrPartner,
  setAccountsHome,
  setResourcesHome,
  setPartner,
  setResourcesDrawerSections,
} from "@/app/store/clientify/clientifySlice";
import {
  addRow,
  resetRows,
  InvoiceRow,
  setPage,
  setTotalCount,
  setNextPageUrl,
  setRemoteSearchRows,
  setInvoicesLoading,
  toggleSelectedInvoice,
  setSettlementDetail,
} from "./invoicesTableSlice";
import { AppDispatch, RootState } from "../store";
import { Dayjs } from "dayjs";

// Función para obtener los datos del partner
export const fetchPartnerInfo = async (
  partnerId: number,
  dispatch: (action: any) => void
) => {
  try {
    console.log("fetchPartnerInfo called with partnerId:", partnerId);
    dispatch(setLoading(true));
    const partnerResponse = await axios.get(
      `https://app.clientify.com/billing-admin/api/partners/${partnerId}/`,
      {
        headers: {
          Authorization: "token 3a127c84b7a9740cb6b0f4c65d9557c962027a96",
        },
      }
    );
    const apiData = partnerResponse.data;

    if (apiData && typeof apiData === "object") {
      dispatch(setCurrentPartnerId(partnerId));

      // Subscription Plans
      const totalPlans = apiData.subaccount_plans_count || 0;
      const plans =
        apiData.subaccount_plans?.map(
          (plan: { name: string; value: number }) => ({
            name: plan.name || "Unknown",
            count: plan.value || 0,
            isFree: (plan.name || "").toLowerCase().includes("free trial"),
          })
        ) || [];
      dispatch(setSubscriptionPlans({ totalPlans, plans }));

      // Summary Panel
      dispatch(
        setSummaryPanel({
          totalContacts: apiData.current_contacts || 0,
          activeSubscriptions: apiData.active_subscriptions || 0,
          totalCommissionsPaid: apiData.total_invoices_payed || 0,
        })
      );

      // Recurrence Chart
      dispatch(
        setRecurrenceChart({
          monthly: apiData.recurrence_percentage?.monthly || 0,
          yearly: apiData.recurrence_percentage?.yearly || 0,
        })
      );

      // MRR Partner
      dispatch(
        setMrrPartner({
          totalMrr: apiData.total_mrr || 0,
        })
      );

      // Accounts Home
      dispatch(
        setAccountsHome({
          totalAccounts: apiData.subaccounts_count || 0,
          accounts:
            apiData.subaccounts?.map((acc: { name: string; plan: string }) => ({
              name: acc.name || "Unnamed",
              isActive: (acc.plan || "") !== "Free Trial",
            })) || [],
        })
      );

      // Resources Home
      dispatch(
        setResourcesHome({
          allowedResourcesCount: apiData.allowed_resources_count || 0,
          recentResources: apiData.recent_resources || [],
        })
      );

      // Partner
      const accountManager = apiData.account_manager || {};
      dispatch(
        setPartner({
          nameCompany: apiData.name || "Capacitravel S.L.",
          nameUser: `${accountManager.first_name || "Unknown"} ${
            accountManager.last_name || "User"
          }`,
          photoUrl:
            accountManager.profile_picture || "/imgLayout/Rectangle7-png.png",
        })
      );
    } else {
      dispatch(setError("Datos del partner no válidos"));
    }
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    let errorMessage = "Error fetching partner data";
    if (axiosError.response?.data) {
      errorMessage =
        typeof axiosError.response.data === "string"
          ? axiosError.response.data
          : axiosError.response.data.message ||
            axiosError.response.data.error ||
            Object.values(axiosError.response.data)[0] ||
            JSON.stringify(axiosError.response.data);
    } else if (axiosError.message) {
      errorMessage = axiosError.message;
    }
    dispatch(setError(errorMessage));
  } finally {
    dispatch(setLoading(false));
  }
};

// Función para obtener las facturas como thunk
export const fetchInvoicesData =
  (partnerId: number, page: number = 1, pageSize: number = 100) =>
  async (dispatch: (action: any) => void, getState: () => RootState) => {
    try {
      console.log(
        `Fetching invoices for partnerId: ${partnerId}, page: ${page}, pageSize: ${pageSize}`
      );
      dispatch(setInvoicesLoading(true));

      const response = await axios.get(
        `https://app.clientify.com/billing-admin/api/invoices/${partnerId}/?page=${page}&page_size=${pageSize}`,
        {
          headers: {
            Authorization: "token 3a127c84b7a9740cb6b0f4c65d9557c962027a96",
          },
        }
      );
      const invoicesData = response.data;
      console.log("API Response:", invoicesData);

      dispatch(resetRows());
      dispatch(setTotalCount(invoicesData.count || 0));
      dispatch(setNextPageUrl(invoicesData.next || null));

      if (
        invoicesData &&
        invoicesData.results &&
        Array.isArray(invoicesData.results)
      ) {
        invoicesData.results.forEach((invoice: any) => {
          const newRow: InvoiceRow = {
            id: invoice.id,
            codigo: invoice.invoice_number || "N/A",
            cuenta: invoice.account || "N/A",
            importe: invoice.subtotal || 0,
            moneda: invoice.currency || "N/A",
            producto: invoice.description_product || "N/A",
            fechaCreacion: new Date(invoice.created).toLocaleDateString(
              "es-ES",
              { month: "short", day: "2-digit", year: "numeric" }
            ),
            fechaPago: invoice.payment_date
              ? new Date(invoice.payment_date).toLocaleDateString("es-ES", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
              : "--",
            liquidaciones: invoice.settlement_id || "--",
          };
          dispatch(addRow(newRow));
        });
      } else {
        console.log("Datos de facturas no válidos:", invoicesData);
        dispatch(setError("Datos de facturas no válidos"));
      }
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      let errorMessage = "Error fetching invoices data";
      if (axiosError.response) {
        console.error(
          "Error Response:",
          axiosError.response.status,
          axiosError.response.data
        );
        errorMessage =
          typeof axiosError.response.data === "string"
            ? axiosError.response.data
            : axiosError.response.data?.message ||
              axiosError.response.data?.error ||
              Object.values(axiosError.response.data)[0] ||
              JSON.stringify(axiosError.response.data);
      } else if (axiosError.message) {
        console.error("Error Message:", axiosError.message);
        errorMessage = axiosError.message;
      }
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setInvoicesLoading(false));
    }
  };

export const fetchInvoicesBySearch =
  (partnerId: string, search: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setInvoicesLoading(true));

      const response = await axios.get(
        `https://app.clientify.com/billing-admin/api/invoices/${partnerId}/?search=${encodeURIComponent(
          search
        )}`,
        {
          headers: {
            Authorization: "token 3a127c84b7a9740cb6b0f4c65d9557c962027a96",
          },
        }
      );

      const invoicesData = response.data;

      if (invoicesData && Array.isArray(invoicesData.results)) {
        const mappedRows: InvoiceRow[] = invoicesData.results.map(
          (invoice: any) => ({
            id: invoice.id,
            codigo: invoice.invoice_number || "N/A",
            cuenta: invoice.account || "N/A",
            importe: invoice.subtotal || 0,
            moneda: invoice.currency || "N/A",
            producto: invoice.description_product || "N/A",
            fechaCreacion: new Date(invoice.created).toLocaleDateString(
              "es-ES",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            ),
            fechaPago: invoice.payment_date
              ? new Date(invoice.payment_date).toLocaleDateString("es-ES", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
              : "--",
            liquidaciones: invoice.settlement_id || "--",
          })
        );
        dispatch(setRemoteSearchRows(mappedRows));
      } else {
        dispatch(setRemoteSearchRows([]));
      }
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      let errorMessage = "Error fetching search invoices";
      if (axiosError.response?.data) {
        errorMessage =
          typeof axiosError.response.data === "string"
            ? axiosError.response.data
            : axiosError.response.data.message ||
              axiosError.response.data.error ||
              Object.values(axiosError.response.data)[0] ||
              JSON.stringify(axiosError.response.data);
      } else if (axiosError.message) {
        errorMessage = axiosError.message;
      }
      console.error("Error buscando facturas:", errorMessage);
      dispatch(setError(errorMessage));
      dispatch(setRemoteSearchRows([]));
    } finally {
      dispatch(setInvoicesLoading(false));
    }
  };

export const fetchPendingPayments =
  (partnerId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setInvoicesLoading(true));
      const response = await axios.get(
        `https://app.clientify.com/billing-admin/api/invoices/${partnerId}/?pending_payment=true`,
        {
          headers: {
            Authorization: "token 3a127c84b7a9740cb6b0f4c65d9557c962027a96",
          },
        }
      );
      const invoicesData = response.data;

      if (invoicesData && Array.isArray(invoicesData.results)) {
        const mappedRows: InvoiceRow[] = invoicesData.results.map(
          (invoice: any) => ({
            id: invoice.id,
            codigo: invoice.invoice_number || "N/A",
            cuenta: invoice.account || "N/A",
            importe: invoice.subtotal || 0,
            moneda: invoice.currency || "N/A",
            producto: invoice.description_product || "N/A",
            fechaCreacion: new Date(invoice.created).toLocaleDateString(
              "es-ES",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            ),
            fechaPago: invoice.payment_date
              ? new Date(invoice.payment_date).toLocaleDateString("es-ES", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
              : "--",
            liquidaciones: invoice.settlement_id || "--",
          })
        );
        dispatch(setRemoteSearchRows(mappedRows));
      } else {
        dispatch(setRemoteSearchRows([]));
      }
    } catch (error) {
      console.error("Error fetching pending payments:", error);
      dispatch(setRemoteSearchRows([]));
    } finally {
      dispatch(setInvoicesLoading(false));
    }
  };

export const fetchPendingCommissions =
  (partnerId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setInvoicesLoading(true));
      const response = await axios.get(
        `https://app.clientify.com/billing-admin/api/invoices/${partnerId}/?pending_commission=true`,
        {
          headers: {
            Authorization: "token 3a127c84b7a9740cb6b0f4c65d9557c962027a96",
          },
        }
      );
      const invoicesData = response.data;

      if (invoicesData && Array.isArray(invoicesData.results)) {
        const mappedRows: InvoiceRow[] = invoicesData.results.map(
          (invoice: any) => ({
            id: invoice.id,
            codigo: invoice.invoice_number || "N/A",
            cuenta: invoice.account || "N/A",
            importe: invoice.subtotal || 0,
            moneda: invoice.currency || "N/A",
            producto: invoice.description_product || "N/A",
            fechaCreacion: new Date(invoice.created).toLocaleDateString(
              "es-ES",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            ),
            fechaPago: invoice.payment_date
              ? new Date(invoice.payment_date).toLocaleDateString("es-ES", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
              : "--",
            liquidaciones: invoice.settlement_id || "--",
          })
        );
        dispatch(setRemoteSearchRows(mappedRows));
      } else {
        dispatch(setRemoteSearchRows([]));
      }
    } catch (error) {
      console.error("Error fetching pending commissions:", error);
      dispatch(setRemoteSearchRows([]));
    } finally {
      dispatch(setInvoicesLoading(false));
    }
  };

// Función para obtener las facturas por rango de fechas

export const fetchInvoicesByDateRange =
  (partnerId: string, startDate: Dayjs, endDate?: Dayjs) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setInvoicesLoading(true));

      const params = new URLSearchParams();
      params.append("page", "1");
      params.append("page_size", "25");
      params.append("date_start", startDate.format("D/M/YYYY")); // Formato exacto

      if (endDate) {
        params.append("date_end", endDate.format("D/M/YYYY"));
      }

      const url = `https://app.clientify.com/billing-admin/api/invoices/${partnerId}/?${params.toString()}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: "token 3a127c84b7a9740cb6b0f4c65d9557c962027a96",
        },
      });

      const data = response.data?.results || [];

      const mappedRows: InvoiceRow[] = data.map((invoice: any) => ({
        id: invoice.id,
        codigo: invoice.invoice_number || "N/A",
        cuenta: invoice.account || "N/A",
        importe: invoice.subtotal || 0,
        moneda: invoice.currency || "N/A",
        producto: invoice.description_product || "N/A",
        fechaCreacion: new Date(invoice.created).toLocaleDateString("es-ES", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        fechaPago: invoice.payment_date
          ? new Date(invoice.payment_date).toLocaleDateString("es-ES", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })
          : "--",
        liquidaciones: invoice.settlement_id || "--",
      }));

      dispatch(setRemoteSearchRows(mappedRows));
    } catch (error) {
      console.error("❌ Error al buscar facturas por fecha:", error);
      dispatch(setRemoteSearchRows([]));
    } finally {
      dispatch(setInvoicesLoading(false));
    }
  };

// Función para obtener los detalles de la liquidación por ID

export const fetchSettlementDetailById =
  (settlementId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const response = await axios.get(
        `https://app.clientify.com/billing-admin/api/settlements-detail/${settlementId}`,
        {
          headers: {
            Authorization: "token 3a127c84b7a9740cb6b0f4c65d9557c962027a96",
          },
        }
      );

      if (response.data) {
        dispatch(setSettlementDetail(response.data));
      }
    } catch (error) {
      console.error("❌ Error al obtener liquidación:", error);
      dispatch(setSettlementDetail(null));
    } finally {
      dispatch(setLoading(false));
    }
  };

// 🔥 THUNK para traer recursos del drawer
export const fetchResourcesDrawerByPartner =
  (partnerId: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(
        `https://app.clientify.com/billing-admin/api/resources/${partnerId}/`,
        {
          headers: {
            Authorization: "token 3a127c84b7a9740cb6b0f4c65d9557c962027a96",
          },
        }
      );

      const data = response.data;

      if (data && Array.isArray(data)) {
        const mappedSections = data.map((section: any) => ({
          id: section.id,
          title: section.name,
          items: section.resources.map((res: any) => ({
            id: res.id,
            name: res.name,
            url: res.url,
            new: res.new,
          })),
        }));

        dispatch(setResourcesDrawerSections(mappedSections));
      }
    } catch (error) {
      console.error("❌ Error cargando recursos del drawer:", error);
    }
  };

// Función combinada para llamar a ambas
export const fetchPartnerData =
  (partnerId: number, page?: number, pageSize?: number) =>
  async (dispatch: (action: any) => void, getState: () => RootState) => {
    console.log("fetchPartnerData called with partnerId:", partnerId);
    await Promise.all([
      fetchPartnerInfo(partnerId, dispatch),
      fetchInvoicesData(partnerId, page, pageSize)(dispatch, getState),
    ]);
  };
