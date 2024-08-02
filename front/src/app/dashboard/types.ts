export interface INavLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface IUserData {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  age: number;
  role: string;
  imgUrl: string;
}
