import client from "./client.js";

const seed = async () => {
  console.log("add logic to create and seed tables");
  for (let i = 0; i < 5; i++) {
    const user = {
      name: "User " + i,
      last_name: "User's last name " + i,
      email: "Test email " + i,
      password: "Test password " + i,
    };
    const event = {
      title: "Event title: " + i,
      description: "Event description: " + i,
      event_date: "2000-01-0" + i,
      event_time: "00:00:0" + i,
      location_id: i,
      image_url: "Sample image: " + i,
      organizer_id: i,
    };
  }
};

export default seed;
