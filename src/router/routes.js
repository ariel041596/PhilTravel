const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/home", component: () => import("pages/PageDashboard.vue") },
      { path: "/auth", component: () => import("pages/PageAuth.vue") },
      {
        path: "/diy-itinerary",
        component: () => import("pages/PageDiyItinerary.vue")
      },
      {
        path: "/my-itinerary",
        component: () => import("pages/PageMyItinerary.vue")
      },
      {
        path: "/my-itinerary/:id",
        component: () => import("pages/PageItineraryDetails.vue")
      },
      {
        path: "/account",
        component: () => import("pages/PageAccount.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
