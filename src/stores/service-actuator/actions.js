import ServiceActuator from "@/services/service-actuator";

export async function getMetrics() {
  const {data} = await ServiceActuator.getMetrics();
  return data;
}