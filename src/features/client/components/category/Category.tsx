import { useEffect, useState } from "react";
import { fetchCategories } from "../../../../features/client/services/HomeService";
import { Categories } from "features/model/Categories";
import "../../../../styles/Category.css";

interface CategoryProps {
  onCategorySelect: (category: Categories) => void;
}

const Category = ({ onCategorySelect }: CategoryProps) => {
  const [categories, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
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
