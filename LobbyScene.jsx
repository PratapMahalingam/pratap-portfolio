// Lobby background. The painted sky-island artwork was generated with
// Higgsfield (Z Image model) as an original image: no game logos,
// characters or official artwork. Files: public/lobby-bg*.{webp,jpg}.
export default function LobbyScene() {
  return (
    <div className="scene" aria-hidden="true">
      <picture className="scene-art">
        <source media="(max-width: 720px)" srcSet="lobby-bg-sm.webp" type="image/webp" />
        <source srcSet="lobby-bg.webp" type="image/webp" />
        <img src="lobby-bg.jpg" alt="" fetchPriority="high" decoding="async" />
      </picture>
      <div className="scene-beams" />
      <div className="sparkles">
        {Array.from({ length: 14 }).map((_, i) => (
          <i key={i} style={{ '--i': i }} />
        ))}
      </div>
      <div className="scene-readability" />
    </div>
  )
}
