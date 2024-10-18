import Category from "../pages/Category"
import Customer from "../pages/Customer"
import Profile from "../pages/Profile"
import Orders from "../pages/Orders"
import Login from "../pages/Login"
import Order from "../pages/Order"
import Item from "../pages/Item"
import Home from "../pages/Home"
import User from "../pages/User"

import { Route, Routes } from "react-router-dom"
import { AuthAdminRoutes } from "./admin.routes"
import { AuthRoutes } from "./auth.routes"

export function Router() {

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
                <AuthRoutes>
                    <Home />
                </AuthRoutes>
            } />
            <Route path="/profile" element={
                <AuthRoutes>
                    <Profile />
                </AuthRoutes>
            } />
            <Route path="/user" element={
                <AuthAdminRoutes>
                    <User />
                </AuthAdminRoutes>
            } />
            <Route path="/customer" element={
                <AuthRoutes>
                    <Customer />
                </AuthRoutes>
            } />

            <Route path="/category" element={
                <AuthRoutes>
                    <Category />
                </AuthRoutes>
            } />
            <Route path="/item" element={
                <AuthRoutes>
                    <Item />
                </AuthRoutes>
            } />
            <Route path="/order" element={
                <AuthRoutes>
                    <Orders />
                </AuthRoutes>
            } />
            <Route path="/order/:id" element={
                <AuthRoutes>
                    <Order />
                </AuthRoutes>
            } />
        </Routes>
    )
}