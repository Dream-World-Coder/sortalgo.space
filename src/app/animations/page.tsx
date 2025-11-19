import QuicksortAnim from "./quick-sort";

export default async function AnimationsPage() {
  return <QuicksortAnim />;
}

// export default async function Animation({
//   params,
// }: {
//   params: Promise<{ animation: string }>;
// }) {
//   const { animation } = await params;
//   try {
//     const mod = await import(`./${animation}.tsx`);
//     const Content = mod.default;

//     return <Content />;
//   } catch (err) {
//     console.log("animation not found for", animation, ". error: ", err);
//     return <h1 className="py-10 text-4xl">Animation Not Found | 404</h1>;
//   }
// }
