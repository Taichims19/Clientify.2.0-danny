// src/redux/clientifyThunks.ts
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
  setPartner, // Nueva acción
} from "@/app/store/clientify/clientifySlice"; // Ajusta las rutas

// Nueva función asíncrona para obtener datos del partner
export const fetchPartnerData = async (
  partnerId: number,
  dispatch: (action: any) => void
) => {
  try {
    dispatch(setLoading(true)); // Iniciar carga

    const response = await axios.get(
      `https://app.clientify.com/billing-admin/api/partners/${partnerId}/`,
      {
        headers: {
          Authorization: "token 3a127c84b7a9740cb6b0f4c65d9557c962027a96",
        },
      }
    );
    const apiData = response.data;

    if (apiData && typeof apiData === "object") {
      // Actualizar currentPartnerId
      dispatch(setCurrentPartnerId(partnerId));

      // Subscription Plans
      const totalPlans = apiData.subaccount_plans_count || 0;
      const plans = apiData.subaccount_plans
        ? apiData.subaccount_plans.map(
            (plan: { name: string; value: number }) => ({
              name: plan.name,
              count: plan.value || 0,
              isFree: plan.name.toLowerCase().includes("free trial"),
            })
          )
        : [];
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
          monthly: (apiData.recurrence_percentage?.monthly as number) || 0,
          yearly: (apiData.recurrence_percentage?.yearly as number) || 0,
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
          accounts: apiData.subaccounts
            ? apiData.subaccounts.map(
                (acc: { name: string; plan: string }) => ({
                  name: acc.name || "Unnamed",
                  isActive: acc.plan !== "Free Trial", // Asumimos "Free Trial" como inactivo
                })
              )
            : [],
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

      dispatch(setLoading(false)); // Terminar carga
    } else {
      dispatch(setLoading(false));
      dispatch(setError("Datos de la API no válidos"));
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
    dispatch(setLoading(false));
  }
};
