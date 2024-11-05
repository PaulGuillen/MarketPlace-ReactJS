import { auth, db } from "../../../config/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const registerUser = async (
    name: string,
    lastname: string,
    document: string,
    email: string,
    phone: string,
    password: string
) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const fullName = `${name} ${lastname}`;
        const isDNI = document.length === 8;
        const documentType = isDNI ? "dni" : "cex";
        
        await updateProfile(user, { displayName: fullName });
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name,
            lastname,
            documentType,
            document,
            email,
            phone,
        });

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};
