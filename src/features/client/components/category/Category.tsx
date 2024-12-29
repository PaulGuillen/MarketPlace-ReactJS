import { useEffect, useState } from "react";
import { fetchCategories } from "../../../../features/client/services/HomeService";
import { Categories } from "../../../../features/model/Categories";

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
<section className="flex justify-center items-center overflow-x-auto gap-6 px-4 py-8 scrollbar-custom">
  {categories.map((category, index) => (
    <div
      key={index}
      className="flex flex-col items-center cursor-pointer flex-shrink-0 transform transition-transform hover:scale-110"
      onClick={() => onCategorySelect(category)}
    >
      <div className="w-24 h-24 md:w-28 md:h-28 bg-gray-200 rounded-full overflow-hidden shadow-md flex items-center justify-center hover:shadow-lg">
        <img
          src={category.imageUrl}
          alt={category.title}
          className="w-3/4 h-3/4 object-contain"
        />
      </div>
      <h3 className="text-center mt-2 text-sm md:text-base font-medium text-gray-700 hover:text-orange-500">
        {category.title}
      </h3>
    </div>
  ))}
</section>

  );
};

export default Category;
