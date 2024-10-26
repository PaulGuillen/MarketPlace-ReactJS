import { useEffect, useState } from "react";
import { fetchCategories } from "../../../features/client/services/HomeService";
import { CategoriesHome } from "features/model/CategoriesHome";
import "../../../styles/Category.css";

interface CategoryProps {
  onCategorySelect: (category: CategoriesHome) => void;
}

const Category = ({ onCategorySelect }: CategoryProps) => {
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
        <div
          className="category-card"
          key={index}
          onClick={() => onCategorySelect(category)}
        >
          <h3 className="category-title">{category.title}</h3>
        </div>
      ))}
    </section>
  );
};

export default Category;
