'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function NavHeader() {
    return (
        <Navbar className="bg-white shadow-md" isBordered>
        <NavbarBrand>
          <Link href="/" className="text-2xl font-bold text-gray-900">
            岩石切片
          </Link>
        </NavbarBrand>
        <NavbarContent className="gap-6" justify="end">
          <NavbarItem isActive>
            <Button
              as={Link}
              href="/gallery"
              className="text-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Gallery
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              href="/gallery/upload"
              className="text-lg bg-gray-200 text-gray-900 hover:bg-gray-300"
            >
              Upload
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    )
}