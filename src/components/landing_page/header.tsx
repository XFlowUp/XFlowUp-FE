"use client"

import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Menu} from "lucide-react"
import * as React from "react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {cn} from "@/shared/lib/utils"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";

const products: { title: string; href: string; description: string }[] = [
    {
        title: "Product Overview",
        href: "/products",
        description: "Comprehensive overview of our product lineup and features.",
    },
    {
        title: "Pricing",
        href: "/pricing",
        description: "Detailed pricing information for our product tiers.",
    },
    {
        title: "Use Cases",
        href: "/use-cases",
        description: "Explore how different industries utilize our solutions.",
    },
    {
        title: "Integrations",
        href: "/integrations",
        description: "Discover how our products integrate with other tools.",
    },
]

const developers: { title: string; href: string; description: string }[] = [
    {
        title: "Documentation",
        href: "/docs",
        description: "Comprehensive API and developer documentation.",
    },
    {
        title: "Getting Started",
        href: "/docs/getting-started",
        description: "Quick guide to start using our developer tools.",
    },
    {
        title: "API Reference",
        href: "/docs/api",
        description: "Detailed reference for all our API endpoints.",
    },
    {
        title: "SDKs",
        href: "/docs/sdks",
        description: "Official SDKs for various programming languages.",
    },
]

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({className, title, children, ...props}, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export function Header() {
    return (
        <header
            className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur
            supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6 lg:px-8"
        >
            <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center gap-4 sm:gap-6">
                    <Link href="/" className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 65" fill="currentColor"
                             className="h-6 w-6">
                            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z"/>
                        </svg>
                        <span className="font-bold inline-block">XFlowUp</span>
                    </Link>
                    <nav className="hidden md:flex gap-4 sm:gap-6">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                            {products.map((product) => (
                                                <ListItem
                                                    key={product.title}
                                                    title={product.title}
                                                    href={product.href}
                                                >
                                                    {product.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Developers</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                            {developers.map((dev) => (
                                                <ListItem
                                                    key={dev.title}
                                                    title={dev.title}
                                                    href={dev.href}
                                                >
                                                    {dev.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <Link href="/docs" legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            Documentation
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>
                </div>
                <div className="hidden md:flex items-center">
                    <Button>Login</Button>
                </div>

                <Drawer>
                    <DrawerTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6"/>
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader className="text-left">
                            <DrawerTitle>Menu</DrawerTitle>
                        </DrawerHeader>
                        <div className="grid gap-4 px-4 py-4">
                            <div className="grid gap-2">
                                <h3 className="text-sm font-semibold">Products</h3>
                                {products.map((product) => (
                                    <DrawerClose key={product.title} asChild>
                                        <Link
                                            href={product.href}
                                            className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {product.title}
                                        </Link>
                                    </DrawerClose>
                                ))}
                            </div>
                            <div className="grid gap-2">
                                <h3 className="text-sm font-semibold">Developers</h3>
                                {developers.map((dev) => (
                                    <DrawerClose key={dev.title} asChild>
                                        <Link
                                            href={dev.href}
                                            className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {dev.title}
                                        </Link>
                                    </DrawerClose>
                                ))}
                            </div>
                            <DrawerClose asChild>
                                <Link
                                    href="/docs"
                                    className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Documentation
                                </Link>
                            </DrawerClose>
                        </div>
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button>Login</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>
        </header>
    )
}
