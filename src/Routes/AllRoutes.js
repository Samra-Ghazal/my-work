import DynamicForm from "../Pages/DynamicForm";
import FieldsForm from "../Pages/DynamicForm/fieldsForm";
import PreviewPage from "../Pages/DynamicForm/previewPage";
import ViewPage from "../Pages/DynamicForm/viewPage";

const routes = [
  {
    path: "/dynamic-form",
    component: DynamicForm,
    ispublic: true,
    exact: true,
  },
  {
    path: "/customer-dynamic-fields",
    component: FieldsForm,
    ispublic: true,
    exact: true,
  },
  {
    path: "/preview-page",
    component: PreviewPage,
    ispublic: true,
    exact: true,
  },
  {
    path: "/view-page",
    component: ViewPage,
    ispublic: true,
    exact: true,
  },
];

export default routes;
