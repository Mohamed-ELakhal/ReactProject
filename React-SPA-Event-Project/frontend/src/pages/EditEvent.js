import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";
import { json} from "react-router-dom";


function EditEventPage() {
  const data = useRouteLoaderData("event-detail");
  return <EventForm method={"patch"} event={data.event} />;
}

export default EditEventPage;

export async function action({ params, request }) {
  const data = await request.FormData();
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };
  const rerponse =fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(eventData),
  });
  if(!rerponse.ok) {
    throw json(
      {message:'Could Not Save Event Data'},
      {status:500}
    );
  }
}
