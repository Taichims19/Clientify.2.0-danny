import axios, { AxiosError, CancelTokenSource } from "axios";
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
  setActivePlans,
  setAccountPlansSelect,
  setHasFetchedResources,
  setResourcesLoading,
  setAccountsHomeLoading,
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

// Definir el tipo de retorno del thunk
type CleanupFunction = () => void;

interface InvoiceFilters {
  pending_payment?: boolean;
  pending_commission?: boolean;
  date_start?: string; // Cambiado de Dayjs a string
  date_end?: string; // Cambiado de Dayjs a string
  search?: string;
}

interface AccountFilters {
  recurrence?: "monthly" | "yearly";
  startDate?: string; // Formato: YYYY-MM-DD
  endDate?: string; // Formato: YYYY-MM-DD
}

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

      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("page_size", pageSize.toString());

      const response = await axios.get(
        `https://app.clientify.com/billing-admin/api/invoices/${partnerId}/?${params.toString()}`,
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

//multu-thunk para popoverinvoices
export const fetchInvoicesWithFilters =
  (partnerId: string, filters: InvoiceFilters) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setInvoicesLoading(true));

      const params = new URLSearchParams();

      if (filters.pending_payment) {
        params.append("pending_payment", "true");
      }
      if (filters.pending_commission) {
        params.append("pending_commission", "true");
      }
      if (filters.date_start) {
        // Convertimos de YYYY-MM-DD a D/M/YYYY para la API
        const [year, month, day] = filters.date_start.split("-");
        params.append(
          "date_start",
          `${parseInt(day)}/${parseInt(month)}/${year}`
        );
      }
      if (filters.date_end) {
        // Convertimos de YYYY-MM-DD a D/M/YYYY para la API
        const [year, month, day] = filters.date_end.split("-");
        params.append(
          "date_end",
          `${parseInt(day)}/${parseInt(month)}/${year}`
        );
      }
      if (filters.search) {
        params.append("search", encodeURIComponent(filters.search));
      }

      const url = `https://app.clientify.com/billing-admin/api/invoices/${partnerId}/?${params.toString()}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: "token 3a127c84b7a9740cb6b0f4c65d9557c962027a96",
        },
      });

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
        dispatch(setTotalCount(invoicesData.count || 0));
        dispatch(setNextPageUrl(invoicesData.next || null));
      } else {
        dispatch(setRemoteSearchRows([]));
      }
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      let errorMessage = "Error fetching invoices with filters";
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
      console.error("Error fetching invoices:", errorMessage);
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

// Mapa para rastrear solicitudes en curso por partnerId
const activeRequests: Map<string, Promise<void>> = new Map();

// 🔥 THUNK para traer recursos del drawer
export const fetchResourcesDrawerByPartner =
  (partnerId: string) =>
  async (
    dispatch: AppDispatch,
    getState: () => RootState
  ): Promise<CleanupFunction> => {
    const source: CancelTokenSource = axios.CancelToken.source();

    try {
      // Verificar si ya hay una solicitud en curso para este partnerId
      if (activeRequests.has(partnerId)) {
        await activeRequests.get(partnerId);
        return () => {};
      }

      const { resourcesDrawer } = getState().clienty;
      if (resourcesDrawer.hasFetchedResources) {
        return () => {};
      }

      const requestPromise = (async () => {
        try {
          dispatch(setResourcesLoading(true));

          const response = await axios.get(
            `https://app.clientify.com/billing-admin/api/resources/${partnerId}/`,
            {
              headers: {
                Authorization: "token 3a127c84b7a9740cb6b0f4c65d9557c962027a96",
              },
              cancelToken: source.token,
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
            dispatch(setHasFetchedResources(true));
          }
        } finally {
          dispatch(setResourcesLoading(false));
          activeRequests.delete(partnerId);
        }
      })();

      activeRequests.set(partnerId, requestPromise);
      await requestPromise;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Solicitud cancelada:", error.message);
      } else {
        console.error("❌ Error cargando recursos del drawer:", error);
      }
      activeRequests.delete(partnerId);
    }

    return () => {
      source.cancel("Solicitud cancelada por desmontaje del componente");
    };
  };

// 🔥 THUNK para traer planes activos SIN modificar los datos base
export const fetchActiveSubscriptionPlans =
  (partnerId: string, active: boolean) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const queryParam = active ? "true" : ""; // 👈 se construye el valor según estado del switch

      const response = await axios.get(
        `https://app.clientify.com/billing-admin/api/subscription-plans/${partnerId}/?active_plans=${queryParam}`,
        {
          headers: {
            Authorization: "token 3a127c84b7a9740cb6b0f4c65d9557c962027a96",
          },
        }
      );

      const data = response.data;

      if (data?.subscription_plans) {
        const activePlans = data.subscription_plans.map((plan: any) => ({
          name: plan.name,
          count: plan.value,
          isFree: (plan.name || "").toLowerCase().includes("free trial"),
        }));

        dispatch(
          setActivePlans({ totalPlans: data.total_plans, plans: activePlans })
        );
      }
    } catch (error) {
      console.error("❌ Error obteniendo planes activos:", error);
      dispatch(setActivePlans({ totalPlans: 0, plans: [] }));
    } finally {
      dispatch(setLoading(false));
    }
  };

// ✅ THUNK 1: Obtener lista de cuentas para AccountsHomeDrawer
export const fetchAccountsHomeList =
  (partnerId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setAccountsHomeLoading(true));

      const response = await axios.get(
        `https://app.clientify.com/billing-admin/api/subaccounts/${partnerId}/?page=1`,
        {
          headers: {
            Authorization: "token 3a127c84b7a9740cb6b0f4c65d9557c962027a96",
          },
        }
      );

      const data = response.data;

      if (Array.isArray(data?.results)) {
        const mappedAccounts = data.results.map((acc: any) => ({
          name: acc.name || "Unnamed",
          isActive: true, // Asumimos activo por defecto
          url: acc.url_billing_admin || "", // Mapear url_billing_admin a url
        }));

        dispatch(
          setAccountsHome({
            totalAccounts: data.count || 0,
            accounts: mappedAccounts,
          })
        );
      }
    } catch (error) {
      console.error("❌ Error al obtener subcuentas:", error);
      dispatch(setError("Error al obtener cuentas del drawer"));
    } finally {
      dispatch(setAccountsHomeLoading(false));
    }
  };

// ✅ THUNK 2: Obtener lista de planes para el filtro en AccountsHomeSelect
export const fetchAccountsPlansSelect =
  (partnerId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const response = await axios.get(
        `https://app.clientify.com/billing-admin/api/plans/${partnerId}/`,
        {
          headers: {
            Authorization: "token 3a127c84b7a9740cb6b0f4c65d9557c962027a96",
          },
        }
      );

      const plansRaw = response.data?.plans_select || [];
      const filtered = plansRaw.filter((p: string | null) => p !== null);

      dispatch(setAccountPlansSelect(filtered));
    } catch (error) {
      console.error("❌ Error al obtener planes del filtro:", error);
      dispatch(setError("Error al obtener planes de selección"));
    } finally {
      dispatch(setAccountsHomeLoading(false));
    }
  };

export const fetchFilteredAccounts =
  (
    partnerId: number,
    filters: AccountFilters = {} // Parámetro por defecto para evitar errores si no se pasan filtros
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setAccountsHomeLoading(true));

      // Lógica combinada para cuentas (fetchAccountsHomeList)
      const accountsParams = new URLSearchParams();
      accountsParams.append("page", "1");

      if (filters.recurrence) {
        accountsParams.append("recurrence", filters.recurrence);
      }
      if (filters.startDate) {
        // Convertimos de YYYY-MM-DD a D/M/YYYY para la API
        const [year, month, day] = filters.startDate.split("-");
        accountsParams.append(
          "date_start",
          `${parseInt(day)}/${parseInt(month)}/${year}`
        );
      }
      if (filters.endDate) {
        // Convertimos de YYYY-MM-DD a D/M/YYYY para la API
        const [year, month, day] = filters.endDate.split("-");
        accountsParams.append(
          "date_end",
          `${parseInt(day)}/${parseInt(month)}/${year}`
        );
      }

      const accountsUrl = `https://app.clientify.com/billing-admin/api/subaccounts/${partnerId}/?${accountsParams.toString()}`;
      const accountsResponse = await axios.get(accountsUrl, {
        headers: {
          Authorization: "token 3a127c84b7a9740cb6b0f4c65d9557c962027a96",
        },
      });

      const accountsData = accountsResponse.data;
      if (Array.isArray(accountsData?.results)) {
        const mappedAccounts = accountsData.results.map((acc: any) => ({
          name: acc.name || "Unnamed",
          isActive: true,
          url: acc.url_billing_admin || "",
        }));
        dispatch(
          setAccountsHome({
            totalAccounts: accountsData.count || 0,
            accounts: mappedAccounts,
          })
        );
      }

      // Lógica para planes (fetchAccountsPlansSelect)
      const plansUrl = `https://app.clientify.com/billing-admin/api/plans/${partnerId}/`;
      const plansResponse = await axios.get(plansUrl, {
        headers: {
          Authorization: "token 3a127c84b7a9740cb6b0f4c65d9557c962027a96",
        },
      });

      const plansRaw = plansResponse.data?.plans_select || [];
      const filteredPlans = plansRaw.filter((p: string | null) => p !== null);
      dispatch(setAccountPlansSelect(filteredPlans));
    } catch (error) {
      console.error("❌ Error al obtener datos filtrados:", error);
      dispatch(setError("Error al obtener datos filtrados"));
    } finally {
      dispatch(setAccountsHomeLoading(false));
    }
  };

// Función combinada para llamar a ambas

export const fetchPartnerData =
  (partnerId: number, page?: number, pageSize?: number) =>
  async (dispatch: (action: any) => void, getState: () => RootState) => {
    const partnerIdStr = partnerId.toString(); // Usar string como clave
    try {
      // Verificar si ya hay una solicitud en curso para este partnerId
      if (activeRequests.has(partnerIdStr)) {
        await activeRequests.get(partnerIdStr);
        return;
      }

      const requestPromise = (async () => {
        console.log("fetchPartnerData called with partnerId:", partnerId);
        await Promise.all([
          fetchPartnerInfo(partnerId, dispatch),
          fetchInvoicesData(partnerId, page, pageSize)(dispatch, getState),
        ]);
      })();

      activeRequests.set(partnerIdStr, requestPromise);
      await requestPromise;
    } catch (error) {
      console.error("Error en fetchPartnerData:", error);
    } finally {
      activeRequests.delete(partnerIdStr);
    }
  };
