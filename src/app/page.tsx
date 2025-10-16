export default function Home() {
  return (
    <main>
      <div className="bg" aria-hidden="true"></div>
      <div className="overlay" aria-hidden="true"></div>

      <div className="training-badge">Training Simulation</div>

      <div className="modal" role="dialog" aria-labelledby="phish-title">
        <h1 id="phish-title">Microsoft Excel</h1>
        <p>Please enter the email credentials this file was shared with</p>

        <a href="#" className="btn outlook">Sign in with Outlook</a>
        <a href="#" className="btn office">Sign in with Office365</a>
        <a href="#" className="btn other">Sign in with Other Mail</a>

        <p style={{ marginTop: '20px', fontSize: '12px', color: '#ccc' }}>©2021 Microsoft</p>
      </div>
    </main>
  );
}
