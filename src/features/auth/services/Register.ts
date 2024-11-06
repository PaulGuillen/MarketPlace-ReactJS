import { auth, db } from "../../../config/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDocumentType } from "../../../utils/Utils";
import { ROLE_CLIENT } from "../../../utils/Constants";

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

        await updateProfile(user, { displayName: fullName });
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: name,
            lastName: lastname,
            documentType: getDocumentType(document),
            document: document,
            email: email,
            phone: phone,
            role: ROLE_CLIENT,
        });

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};
