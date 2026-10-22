import dionicio from "../assets/dionicioPhoto.png";
const developers = [
  {
    name: "Dionicio Flores",
    role: "Backend & Database",
    github: "https://github.com/diony121",
    image: dionicio, 
  },
  {
    name: "Alexander Chen",
    role: "Navigation & Public Pages",
    github: "https://github.com/achen2291",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Han Thu",
    role: "Event Management & Orders",
    github: "https://github.com/hanvibe",
    image: "https://via.placeholder.com/150",
  },
];

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About Local Events Hub</h1>
        <p>
          Local Events Hub is a full-stack web application that connects
          residents, businesses, and community organizations with local events
          in one centralized place. Instead of searching across social media,
          group chats, and scattered websites, users can browse events, filter
          by category, view full details, and purchase tickets — all in one
          hub.
        </p>
        <p>
          Organizers can create and manage their events, set ticket types and
          prices, track availability, and reschedule when needed. Attendees can
          register, log in, buy tickets, and review their order history at any
          time.
        </p>
      </section>

      <section className="about-how">
        <h2>How It Works</h2>
        <ol>
          <li>Create an account or log in.</li>
          <li>Browse and filter events by category.</li>
          <li>Open an event to see full details and available tickets.</li>
          <li>Purchase tickets securely — stock updates instantly.</li>
          <li>View your order history anytime under My Tickets.</li>
          <li>Organizers can create, edit, reschedule, or delete events.</li>
        </ol>
      </section>

      <section className="about-team">
        <h2>Meet the Developers</h2>
        <div className="team-grid">
          {developers.map((dev) => (
            <div key={dev.github} className="team-card">
              <img src={dev.image} alt={dev.name} className="team-photo" />
              <h3>{dev.name}</h3>
              <p>{dev.role}</p>
              <a
                href={dev.github}
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                GitHub Profile
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}