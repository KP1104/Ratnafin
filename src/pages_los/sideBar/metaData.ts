import { NavBarMetaDataType } from "components/navigation";

export const metaData: NavBarMetaDataType = {
  config: {
    rel: "noopener noreferrer",
    target: "_blank",
  },
  navItems: [
    {
      label: "Dashboard",
      href: "./dashboard",
      isRouterLink: true,
      icon: "hashtag",
    },
    {
      label: "New Inquiry",
      icon: "plus",
      isRouterLink: true,
      href: "./newInquiry",
      children: [
        {
          label: "Retails Loans",
          children: [
            {
              label: "Retail Home Loan",
              href: "./newInquiry/retail-rhl",
              isRouterLink: true,
              navigationProps: {
                categoryID: "12000001",
                productID: "12300001",
              },
              passNavigationPropsAsURLParmas: true,
            },
            {
              label: "Retail LAP (Loan Against Property)",
              href: "./newInquiry/retail-lap",
              isRouterLink: true,
              navigationProps: {
                categoryID: "12000001",
                productID: "12300002",
              },
              passNavigationPropsAsURLParmas: true,
            },
            {
              label: "Retail LRD (Lease Rental Discount)",
              href: "./newInquiry/retail-ldr",
              isRouterLink: true,
              navigationProps: {
                categoryID: "12000001",
                productID: "12300003",
              },
              passNavigationPropsAsURLParmas: true,
            },
            {
              label: "Retail APF",
              href: "./newInquiry/retail-apf",
              isRouterLink: true,
              navigationProps: {
                categoryID: "12000001",
                productID: "12300004",
              },
              passNavigationPropsAsURLParmas: true,
            },
          ],
        },
        {
          label: "SME Loan",
          children: [
            {
              label: "SME CC/OD",
              href: "./newInquiry/sme",
              isRouterLink: true,
              navigationProps: {
                categoryID: "12000002",
                productID: "12300005",
              },
              passNavigationPropsAsURLParmas: true,
            },
            {
              label: "SME Term Loan",
              href: "./newInquiry/stl",
              isRouterLink: true,
              navigationProps: {
                categoryID: "12000002",
                productID: "12300006",
              },
              passNavigationPropsAsURLParmas: true,
            },
            {
              label: "SME Term Loan + CC/OD",
              href: "./newInquiry/sme-ccod",
              isRouterLink: true,
              navigationProps: {
                categoryID: "12000002",
                productID: "12300007",
              },
              passNavigationPropsAsURLParmas: true,
            },
            {
              label: "SME NFB (Non Fund Base)",
              href: "./newInquiry/sme-nfb",
              isRouterLink: true,
              navigationProps: {
                categoryID: "12000002",
                productID: "12300008",
              },
              passNavigationPropsAsURLParmas: true,
            },
            {
              label: "SME LAP (Loan Against Property)",
              href: "./newInquiry/sme-lap",
              isRouterLink: true,
              navigationProps: {
                categoryID: "12000002",
                productID: "12300009",
              },
              passNavigationPropsAsURLParmas: true,
            },
            {
              label: "SME CGTMSE",
              href: "./newInquiry/sme-cgtmse",
              isRouterLink: true,
              navigationProps: {
                categoryID: "12000002",
                productID: "123000010",
              },
              passNavigationPropsAsURLParmas: true,
            },
          ],
        },
        {
          label: "Infra Loan",
          children: [
            {
              label: "Construction Finance",
              href: "./newInquiry/infra-construction",
              isRouterLink: true,
              navigationProps: {
                categoryID: "12000003",
                productID: "123000011",
              },
              passNavigationPropsAsURLParmas: true,
            },
            {
              label: "Infrastructure Finance",
              href: "./newInquiry/infra-finance",
              isRouterLink: true,
              navigationProps: {
                categoryID: "12000003",
                productID: "123000012",
              },
              passNavigationPropsAsURLParmas: true,
            },
          ],
        },
        {
          label: "Unsecured Loans",
          children: [
            {
              label: "Business Loan",
              href: "./newInquiry/businessLoan",
              isRouterLink: true,
              navigationProps: {
                categoryID: "12000004",
                productID: "123000013",
              },
              passNavigationPropsAsURLParmas: true,
            },
          ],
        },
      ],
    },
    {
      label: "Partner Management",
      icon: "users",
      href: "./partner",
      isRouterLink: true,
    },
    {
      label: "Inquiry Management",
      icon: "question",
      isRouterLink: true,
      href: "./inquiry",
      children: [
        {
          label: "Incoming Inquiries",
          href: "./inquiry/incomingInquiries",
          isRouterLink: true,
          icon: "circle",
          visibleToRoles: [3, 4, 5, 6, 7, 8, 9, 10, 11],
        },
        {
          label: "All Assigned Inquiries",
          href: "./inquiry/allAssignedInquiries",
          isRouterLink: true,
          icon: "circle",
          visibleToRoles: [3, 4, 5, 6, 7, 8, 15, 16, 17],
        },
        {
          label: "My Inquiries",
          href: "./inquiry/myInquiry",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "My Unmapped Inquiries",
          href: "./inquiry/myUnmappedInquiries",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Unmapped Inquiries",
          href: "./inquiry/unmappedInquiries",
          isRouterLink: true,
          icon: "circle",
          visibleToRoles: [3, 4, 5, 6, 7, 8],
        },
        {
          label: "Unmapped Inquiries HO",
          href: "./inquiry/unmappedHOInquiries",
          isRouterLink: true,
          icon: "circle",
          visibleToRoles: [3, 4, 5, 6, 7, 8, 10, 11],
        },
        {
          label: "My Cross Inquiries",
          href: "./inquiry/myCrossInquiries",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "My Team Cross Inquiries",
          href: "./inquiry/myTeamCrossInquiries",
          isRouterLink: true,
          icon: "circle",
          visibleToRoles: [3, 4, 5, 6, 7, 8, 9, 18],
        },
      ],
    },
    {
      label: "Lead Management",
      icon: "tasks",
      children: [
        {
          label: "Leads",
          href: "./lead/details",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Mandate",
          href: "./lead/mandate",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Bank Login",
          href: "./lead/bankLogin",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Sanction",
          href: "./lead/sanction",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Disbursement",
          href: "./lead/disbursement",
          isRouterLink: true,
          icon: "circle",
        },
      ],
    },
    { label: "MIS", icon: "circle" },
    {
      label: "Task Management",
      icon: "tasks",
      children: [
        {
          label: "My Tasks",
          href: "./task/myTask",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Assigned Tasks",
          href: "./task/assigned",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "WorkLog",
          href: "./task/worklog",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Cold Calling",
          href: "./task/coldCalling",
          isRouterLink: true,
          icon: "circle",
        },
      ],
    },
    {
      label: "Reports",
      icon: "table",
      children: [
        {
          label: "Lead Stages SME & CF",
          href: "./reports/leadStagesSMECF",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Lead Stages Retail",
          href: "./reports/leadStagesRetail",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Lead Inquiry Details",
          href: "./reports/leadInquiry",
          isRouterLink: true,
          icon: "circle",
        },
      ],
    },
    {
      label: "Config Management",
      icon: "cog",
      visibleToRoles: [1],
      children: [
        {
          label: "Bank Config",
          href: "./config/bankMaster",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "Product Bank Config",
          href: "./config/banks",
          isRouterLink: true,
          icon: "circle",
        },
        {
          label: "User Management",
          href: "./config/userManagement",
          isRouterLink: true,
          icon: "users",
        },
        {
          label: "Assign Pincode",
          href: "./config/assignPincode",
          isRouterLink: true,
          icon: "circle",
        },
      ],
    },
  ],
};
