import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
} from "react-native-appwrite"

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.leandry.baguiosphere',
    projectId: '669f48a7000c39caec7f',
    databaseId: '669f589f00107e2d90f6',
    storageId: '669f5a5a0007d2645bb6',
    userCollectionId: '669f58b600363e95e27d',
    reviewCollectionId: '669f58de003aaff08b10'
}

const client = new Client()

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)
const storage = new Storage(client)

// Register user
export async function createUser(email, password, username) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        )

        return newUser
    } catch (error) {
        throw new Error(error)
    }
}

// Sign In
export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password)

        return session
    } catch (error) {
        throw new Error(error)
    }
}

// Get Account
export async function getAccount() {
    try {
        const currentAccount = await account.get()

        return currentAccount
    } catch (error) {
        throw new Error(error)
    }
}

// Get Current User
export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount()
        if (!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )

        if (!currentUser) throw Error

        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

// Get all video Posts
export async function getAllPosts() {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.reviewCollectionId,
            [Query.orderDesc("$createdAt")]
        )

        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}

// Sign Out
export async function signOut() {
    try {
        const session = await account.deleteSession("current")

        return session
    } catch (error) {
        throw new Error(error)
    }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
    let fileUrl

    try {
        if (type === "image") {
            fileUrl = storage.getFilePreview(
                config.storageId,
                fileId,
                2000,
                2000,
                "top",
                100
            )
        } else {
            throw new Error("Invalid file type")
        }

        if (!fileUrl) throw Error

        return fileUrl
    } catch (error) {
        throw new Error(error)
    }
}

// Upload File
export async function uploadFile(file, type) {
    if (!file) return

    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri
    }

    try {
        const uploadedFile = await storage.createFile(
            config.storageId,
            ID.unique(),
            asset
        )

        const fileUrl = await getFilePreview(uploadedFile.$id, type)
        return fileUrl
    } catch (error) {
        throw new Error(error)
    }
}

// Create Post
export async function createPost(form) {
    try {
        const [imageUrl] = await Promise.all([
            uploadFile(form.image, "image")
        ])

        const newPost = await databases.createDocument(
            config.databaseId,
            config.reviewCollectionId,
            ID.unique(),
            {
                image: imageUrl,
                message: form.message,
                place: form.place,
                creator: form.userId,
            }
        )

        return newPost
    } catch (error) {
        throw new Error(error)
    }
}

// Get video posts created by user
export async function getUserPosts(userId) {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.reviewCollectionId,
            [Query.equal("creator", userId)]
        );

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}