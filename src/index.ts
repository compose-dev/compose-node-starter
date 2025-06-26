import { Compose } from "@composehq/sdk";

// For demo purposes. In a real app, you would use an actual database.
const dbUsers = [
  { name: "John Doe", email: "john@doe.com" },
  { name: "Jane Smith", email: "jane@smith.com" },
];

const nav = new Compose.Navigation(["view-users", "create-user"]);

const viewUsersApp = new Compose.App({
  route: "view-users",
  navigation: nav,
  handler: async ({ page, ui }) => {
    page.add(() => ui.header("View Users", { size: "lg" }));
    const users = [...dbUsers]; // fake database call
    page.add(() => ui.table("users-table", users));
  },
});

const createUserApp = new Compose.App({
  route: "create-user",
  navigation: nav,
  handler: async ({ page, ui }) => {
    page.add(() => ui.header("Create User", { size: "lg" }));
    page.add(() =>
      ui.form(
        "create-user-form",
        [ui.textInput("name"), ui.emailInput("email")],
        {
          onSubmit: async (form) => {
            dbUsers.push({ name: form.name, email: form.email });
            page.toast("User created successfully", { appearance: "success" });
            page.link("view-users");
          },
        }
      )
    );
  },
});

const client = new Compose.Client({
  apiKey: "API_KEY_HERE",
  apps: [viewUsersApp, createUserApp],
});

client.connect();
