import express from "express";
import admin from "firebase-admin";

const router = express.Router();

router.post("/pakkasir", async (req, res) => {
  try {
    const data = req.body;

    if (data.status !== "paid") {
      return res.status(200).send("ignored");
    }

    const email = data.customer_email;
    const plan = data.items[0].name;

    const usersRef = admin.firestore().collection("users");

    const snapshot = await usersRef.where("email", "==", email).get();

    if (snapshot.empty) {
      return res.status(404).send("user not found");
    }

    const userDoc = snapshot.docs[0];

    await userDoc.ref.update({
      plan: plan.toLowerCase(),
      planActivatedAt: new Date(),
    });

    res.status(200).send("success");
  } catch (error) {
    console.error(error);
    res.status(500).send("error");
  }
});

export default router;
