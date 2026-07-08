import type { StructureResolver } from "sanity/structure";

const singletonTypes = new Set([
  "siteSettings",
  "homePage",
  "donatePage",
  "youthPage",
  "getInvolvedPage",
  "aboutPage",
  "gallery",
]);

const singletonItems = [
  { title: "Site settings", schemaType: "siteSettings", documentId: "siteSettings" },
  { title: "Home page", schemaType: "homePage", documentId: "homePage" },
  { title: "Donate page", schemaType: "donatePage", documentId: "donatePage" },
  { title: "Ongshi Youth page", schemaType: "youthPage", documentId: "youthPage" },
  {
    title: "Get Involved page",
    schemaType: "getInvolvedPage",
    documentId: "getInvolvedPage",
  },
  { title: "About page", schemaType: "aboutPage", documentId: "aboutPage" },
  { title: "Gallery", schemaType: "gallery", documentId: "gallery" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...singletonItems.map(({ title, schemaType, documentId }) =>
        S.listItem()
          .title(title)
          .id(documentId)
          .child(S.document().schemaType(schemaType).documentId(documentId)),
      ),
      S.divider(),
      S.documentTypeListItem("program").title("Programs"),
      S.documentTypeListItem("campaign").title("Campaigns & events"),
      S.documentTypeListItem("story").title("Stories"),
      S.documentTypeListItem("impactStat").title("Impact stats"),
      S.documentTypeListItem("partner").title("Partners"),
      S.documentTypeListItem("teamMember").title("Team members"),
      S.documentTypeListItem("page").title("Pages"),
    ]);

export { singletonTypes };
