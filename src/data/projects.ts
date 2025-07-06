interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string;
}

const realProjects: Project[] = [
];

const practiceProjects: Project[] = [
  {
    id: 1,
    title: 'Todo List App',
    description: 'A responsive todo list webapp with theme toggle that allows users to add, mark as complete, drag & drop and delete tasks.',
    image: '/img/projects/todo-list-app.png',
    link: 'https://annapmarin.github.io/todo-app/'
  },
  { 
    id: 2, 
    title: 'Interactive Rating Component', 
    description: 'A simple, fun project to explore how users interact with a page and how the content updates in response.', 
    image: '/img/projects/interactive-rating-component.png',
    link: 'https://annapmarin.github.io/interactive-rating-component/',
  },
  {
    id: 3, 
    title: 'Product Preview Card Component', 
    description: 'A simple product preview card component that can be used in e-commerce websites.', 
    image: '/img/projects/product-preview-card-component.webp',
    link: 'https://annapmarin.github.io/Product-preview-card-component/',
  },
  {
    id: 4,
    title: 'Interactive Card Form',
    description: 'A simple interactive card form that allows users to enter their card details and see a preview of the card.',
    image: '/img/projects/interactive-card-form.webp',
    link: 'https://annapmarin.github.io/interactive-card-form/',
  },
  {
    id: 5,
    title: 'Age Calculator App',
    description: 'A simple age calculator app that allows users to enter their birthdate and calculates their age.',
    image: '/img/projects/age-calculator-app.webp',
    link: 'https://annapmarin.github.io/age-calculator/',
  },
  {
    id: 6,
    title: 'News Homepage',
    description: 'A simple news homepage that displays the latest news articles in a responsive grid layout.',
    image: '/img/projects/news-homepage.webp',
    link: 'https://annapmarin.github.io/news-homepage/',
  },
  {
    id: 7,
    title: 'Advice Generator App',
    description: 'A simple advice generator app that fetches random advice from an API and displays it to the user.',
    image: '/img/projects/advice-generator-app.webp',
    link: 'https://annapmarin.github.io/advice-generator-app/',
  },
  {
    id: 8,
    title: 'Newsletter Sign-Up Form',
    description: 'A simple newsletter sign-up form that allows users to enter their email address and subscribe to a newsletter.',
    image: '/img/projects/newsletter-sign-up-form.webp',
    link: 'https://annapmarin.github.io/newsletter-sign-up/',
  },
  {
    id: 9,
    title: 'Retro-Pokédex',
    description: 'A retro-styled Pokédex that allows users to search for Pokémon and view their details built with PokeAPI.',
    image: '/img/projects/retropokedex.png',
    link: 'https://annapmarin.github.io/retropokedex/',
  }
];

const designProjects: Project[] = [
];

export { realProjects, practiceProjects, designProjects };
export type { Project };