import { useEffect, useState } from "react";
import { fetchCategories } from "../../../features/client/services/HomeService";
import { CategoriesHome } from "features/model/CategoriesHome";
import "../../../styles/Category.css";

const Category = () => {
  const [categories, setCategories] = useState<CategoriesHome[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
      console.log(fetchedCategories);
    };

    loadCategories();
  }, []);

  return (
    <section className="category-list">
      {categories.map((category, index) => (
        <div className="category-card" key={index}>
          <h3 className="category-title">{category.title}</h3>
        </div>
      ))}
    </section>
  );
};

export default Category;
