import { useSelector } from "react-redux";
import "../../../styles/business/CategorySection.css";
import { RootState } from "../../../store/store";

const CategorySection = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  console.log(user, isAuthenticated);

  return (
    <div className="categories card">
      <h3>Categoría</h3>
      <input
        className="search-bar-category"
        type="text"
        placeholder="Buscar categoría"
      />
      <ul>
        <li>
          <input type="checkbox" /> Categoría 1
        </li>
        <li>
          <input type="checkbox" /> Categoría 2
        </li>
        <li>
          <input type="checkbox" /> Categoría 3
        </li>
        <li>
          <input type="checkbox" /> Categoría 4
        </li>
        <li>
          <input type="checkbox" /> Categoría 5
        </li>
        <li>
          <div className="btn-add-category">
            <button className="add-category">Agregar</button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CategorySection;
