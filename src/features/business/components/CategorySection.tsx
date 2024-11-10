import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "../../../store/store";
import "../../../styles/business/CategorySection.css";
import { collection, addDoc, doc, updateDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import ProgressLoading from "../../../components/progress-loading/ProgressLoading";

const CategorySection = () => {
  const { userUid, businessUid } = useSelector(
    (state: RootState) => state.business
  );

  const [categories, setCategories] = useState<
    { categoryUid: string; name: string; type: string }[]
  >([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryType, setNewCategoryType] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "categoriesProduct"),
          where("userUid", "==", userUid)
        );
        const querySnapshot = await getDocs(q);
        const categoriesData = querySnapshot.docs.map((doc) => ({
          categoryUid: doc.id,
          ...doc.data(),
        })) as { categoryUid: string; name: string; type: string }[];
        
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error al cargar las categorías: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [userUid]);

  const handleAddCategory = async () => {
    if (newCategoryName.trim() === "" || newCategoryType.trim() === "") return;

    setLoading(true);
    setShowDialog(false);

    try {
      const docRef = await addDoc(collection(db, "categoriesProduct"), {
        name: newCategoryName,
        type: newCategoryType,
        userUid,
        businessUid,
      });

      await updateDoc(doc(db, "categoriesProduct", docRef.id), {
        categoryUid: docRef.id,
      });

      const newCategoryItem = {
        categoryUid: docRef.id,
        name: newCategoryName,
        type: newCategoryType,
      };
      setCategories((prevCategories) => [...prevCategories, newCategoryItem]);
      setNewCategoryName("");
      setNewCategoryType("");
    } catch (error) {
      console.error("Error al agregar la categoría: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="categories card">
      <h3>Categoría</h3>
      <input
        className="search-bar-category"
        type="text"
        placeholder="Buscar categoría"
      />

      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h4>Agregar Categoría</h4>
            <input
              type="text"
              placeholder="Título"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Tipo"
              value={newCategoryType}
              onChange={(e) => setNewCategoryType(e.target.value)}
            />
            <button onClick={handleAddCategory}>Guardar</button>
            <button onClick={() => setShowDialog(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {loading && <ProgressLoading />}

      {categories.length === 0 ? (
        <p>No hay categorías creadas. Crea una categoría.</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.categoryUid}>
              <input type="checkbox" /> {category.name} ({category.type})
            </li>
          ))}
        </ul>
      )}

      <div className="btn-add-category">
        <button className="add-category" onClick={() => setShowDialog(true)}>
          Agregar
        </button>
      </div>
    </div>
  );
};

export default CategorySection;
