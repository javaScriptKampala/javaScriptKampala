import { fetchEvents, fetchBlogPosts, fetchSponsors, fetchProjects } from '../lib/data';
import HomeClient from './home-client';

export default async function Home() {
  const [events, blogPosts, sponsors] = await Promise.all([
    fetchEvents(),
    fetchBlogPosts(),
    fetchSponsors(),
  ]);
  const projects = fetchProjects();

  return (
    <HomeClient
      events={events}
      blogPosts={blogPosts}
      sponsors={sponsors}
      projects={projects}
    />
  );
}
