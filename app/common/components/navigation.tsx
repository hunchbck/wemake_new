import {
  BarChart3Icon,
  BellIcon,
  LogOutIcon,
  MessageCircleIcon,
  SettingsIcon,
  UserIcon
} from "lucide-react";
import { Link } from "react-router";
import { Separator } from "~/common/components/ui/separator";
import { cn } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "./ui/navigation-menu";

const menus = [
  {
    name: "Products",
    to: "/products",
    items: [
      {
        name: "Leaderboards",
        description: "See the top performers in your community",
        to: "/products/leaderboards"
      },
      {
        name: "Categories",
        description: "See the top categories in your community",
        to: "/products/categories"
      },
      {
        name: "Search",
        description: "Search for a product",
        to: "/products/search"
      },
      {
        name: "Submit a Product",
        description: "Submit a product to our community",
        to: "/products/submit"
      },
      {
        name: "Promote",
        description: "Promote a product to our community",
        to: "/products/promote"
      }
    ]
  },
  {
    name: "Jobs",
    to: "/jobs",
    items: [
      {
        name: "Remote Jobs",
        description: "Find a remote job in our community",
        to: "/jobs?location=remote"
      },
      {
        name: "Full-Time Jobs",
        description: "Find a full-time job in our community",
        to: "/jobs?type=full-time"
      },
      {
        name: "Freelance Jobs",
        description: "Find a freelance job in our community",
        to: "/jobs?type=freelance"
      },
      {
        name: "Internships",
        description: "Find an internship in our community",
        to: "/jobs?type=internship"
      },
      {
        name: "Post a Job",
        description: "Post a job to our community",
        to: "/jobs/submit"
      }
    ]
  },
  {
    name: "Community",
    to: "/community",
    items: [
      {
        name: "All Posts",
        description: "See all posts in our community",
        to: "/community"
      },
      {
        name: "Top Posts",
        description: "See the top posts in our community",
        to: "/community?sort=top"
      },
      {
        name: "New Posts",
        description: "See the new posts in our community",
        to: "/community?sort=new"
      },
      {
        name: "Create a Post",
        description: "Create a post in our community",
        to: "/community/submit"
      }
    ]
  },
  {
    name: "IdeasGPT",
    to: "/ideas"
  },
  {
    name: "Teams",
    to: "/teams",
    items: [
      {
        name: "All Teams",
        description: "See all teams in our community",
        to: "/teams"
      },
      {
        name: "Create a Team",
        description: "Create a team in our community",
        to: "/teams/create"
      }
    ]
  }
];

export default function Navigation({
  isLoggedIn,
  hasNotifications,
  hasMessages,
  username,
  avatar,
  name
}: {
  isLoggedIn: boolean;
  hasNotifications: boolean;
  hasMessages: boolean;
  username?: string;
  avatar?: string | null;
  name?: string;
}) {
  return (
    <nav className="bg-background/50 fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between px-20 backdrop-blur">
      <div className="flex items-center">
        <Link className="text-lg font-bold tracking-tighter" to="/">
          wemake
        </Link>
        <Separator className="mx-4 h-6" orientation="vertical" />
        <NavigationMenu>
          <NavigationMenuList>
            {menus.map((menu) => (
              <NavigationMenuItem key={menu.name}>
                {menu.items ? (
                  <>
                    <Link to={menu.to}>
                      <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                    </Link>
                    <NavigationMenuContent>
                      <ul className="grid w-[600px] grid-cols-2 gap-3 p-4 font-light">
                        {menu.items?.map((item) => (
                          <NavigationMenuItem
                            key={item.to}
                            className={cn([
                              "focus:bg-accent hover:bg-accent rounded-md transition-colors select-none",
                              (item.to === "/products/promote" ||
                                item.to === "/jobs/submit") &&
                                "bg-primary/10 hover:bg-primary/20 focus:bg-primary/20 col-span-2"
                            ])}
                          >
                            <NavigationMenuLink asChild>
                              <Link
                                className="block space-y-1 p-3 leading-none no-underline outline-none"
                                to={item.to}
                              >
                                <span className="text-sm leading-none font-medium">
                                  {item.name}
                                </span>
                                <p className="text-muted-foreground text-sm leading-snug">
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link className={navigationMenuTriggerStyle()} to={menu.to}>
                    {menu.name}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {isLoggedIn ? (
        <div className="flex items-center gap-4">
          <Button asChild className="relative" size="icon" variant="ghost">
            <Link to="/my/notifications">
              <BellIcon className="size-4" />
              {hasNotifications && (
                <div className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />
              )}
            </Link>
          </Button>
          <Button asChild className="relative" size="icon" variant="ghost">
            <Link to="/my/messages">
              <MessageCircleIcon className="size-4" />
              {hasMessages && (
                <div className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />
              )}
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                {avatar ? (
                  <AvatarImage className="object-cover" src={avatar} />
                ) : (
                  <AvatarFallback>{name?.[0]}</AvatarFallback>
                )}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="flex flex-col">
                <span className="font-medium">{name}</span>
                <span className="text-muted-foreground text-xs">
                  @{username}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/dashboard">
                    <BarChart3Icon className="mr-2 size-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/profile">
                    <UserIcon className="mr-2 size-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/settings">
                    <SettingsIcon className="mr-2 size-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/auth/logout">
                  <LogOutIcon className="mr-2 size-4" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Button asChild variant="secondary">
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/join">Join</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
