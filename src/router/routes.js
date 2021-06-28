const routes = [
  {
    path: "/",
    redirect: "/home",
    component: () => import("layouts/NewLayout.vue"),
    children: [
      {
        path: "home",
        component: () => import("pages/HomePage/HomePage.vue"),
        name: "home-page"
      },
      // { path: "add-company", component: () => import("pages/AddCompany.vue") },

      {
        path: "checkin",
        component: () => import("pages/CheckinPage/CheckinPage.vue"),
        name: "checkin-page"
      },
      {
        path: "boarding",
        component: () => import("pages/BoardingPage/BoardingPage.vue"),
        name: "boarding-page"
      },
      {
        path: "laporan-checkin",
        component: () =>
          import("pages/LaporanCheckinPage/LaporanCheckinPage.vue"),
        name: "laporanCheckin-page"
      },
      {
        path: "laporan-boarding",
        component: () =>
          import("pages/LaporanBoardingPage/LaporanBoardingPage.vue"),
        name: "laporanBoarding-page"
      },
      {
        path: "akun-saya",
        component: () => import("pages/AccountPage/AccountPage.vue"),
        name: "akunSaya-page"
      }
      // {
      //   path: "validate-account/:id",
      //   component: () => import("pages/ValidateAccount.vue"),
      //   props: route => ({
      //     id: route.params.id,
      //     validate: false
      //   })
      // },
      // {
      //   path: "validate-password/:id",
      //   component: () => import("pages/ValidateAccount.vue"),
      //   props: route => ({
      //     id: route.params.id,
      //     validate: true
      //   })
      // }
    ]
  },
  {
    path: "/splashscreen",
    component: () => import("layouts/FlatLayout2.vue"),
    props: () => ({
      isBlank: true
    }),
    children: [
      {
        path: "",
        component: () => import("pages/SplashPage/SplashPage.vue"),
        name: "splash-page"
      }
    ]
  },
  {
    path: "/auth",
    component: () => import("layouts/FlatLayout.vue"),
    children: [
      {
        path: "/login",
        component: () => import("pages/LoginPage/LoginPage.vue"),
        name: "login-page"
      },
      {
        path: "/maintance",
        component: () => import("pages/MaintancePage/MaintancePage.vue"),
        name: "maintance-page"
      },
      {
        path: "/resetPassword",
        component: () =>
          import("pages/ResetPasswordPage/ResetPasswordPage.vue"),
        name: "reset-password-page"
      },
      {
        path: "/resetPassword/:id",
        component: () =>
          import("pages/ResetPasswordPage/ResetPasswordPage.vue"),
        name: "validate-password-page",
        props: route => ({
          paramKode: route.params.id
        })
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
