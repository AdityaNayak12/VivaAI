import { db } from "./firebase";
import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    where,
    getDocs,
    orderBy,
} from "firebase/firestore";

/**
 * Saves a completed viva session to Firestore.
 *
 * @param {Object} session
 * @param {string} session.userId
 * @param {string} session.email
 * @param {string} session.topic
 * @param {Object[]} session.questions
 * @param {string[]} session.answers
 * @param {number[]} session.scores
 * @param {number} session.totalScore
 * @returns {Promise<import("firebase/firestore").DocumentReference>}
 */
export async function saveVivaSession({
    userId,
    email,
    topic,
    questions,
    answers,
    scores,
    totalScore,
}) {
    return addDoc(collection(db, "vivaSessions"), {
        userId,
        email,
        topic,
        questions,
        answers,
        scores,
        totalScore,
        createdAt: serverTimestamp(),
    });
}

/**
 * Fetches all viva sessions for a user, ordered by most recent first.
 *
 * @param {string} userId - The Firebase user UID
 * @returns {Promise<Object[]>} Array of session data objects
 */
export async function fetchUserSessions(userId) {
    const q = query(
        collection(db, "vivaSessions"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data());
}

/**
 * Computes aggregated stats from session data.
 *
 * @param {Object[]} sessions - Array of session data from fetchUserSessions
 * @returns {{ totalVivas: number, avgScore: string, lastTopic: string }}
 */
export function computeStats(sessions) {
    if (sessions.length === 0) {
        return { totalVivas: 0, avgScore: "0", lastTopic: "-" };
    }

    const totalVivas = sessions.length;

    const totalScore = sessions.reduce(
        (sum, session) => sum + session.totalScore,
        0
    );

    const avgScore = (totalScore / totalVivas).toFixed(1);
    const lastTopic = sessions[0].topic; // latest due to desc order

    return { totalVivas, avgScore, lastTopic };
}
