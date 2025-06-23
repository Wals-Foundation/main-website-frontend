export default function BlockRendererClient({ content }: { readonly content: string }) {
  if (!content) return null
  return <p style={{ whiteSpace: "pre-line" }}>{content}</p>
}
