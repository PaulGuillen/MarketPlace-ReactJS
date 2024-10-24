import "../../../styles/Category.css";

const Category = ({ categories }) => {
  return (
    <section className="category-list">
      {categories.map((category, index) => (
        <div className="category-card" key={index}>
          <h3 className="category-title">{category.title}</h3>
          <p className="category-type">{category.type}</p>
        </div>
      ))}
    </section>
  );
};

export default Category;
