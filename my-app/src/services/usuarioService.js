const API_URL = "http://localhost:3000/api/auth";
const SNAILPAY_URL = "http://localhost:3000/api/snailpay";

export const registerUser = async (userData) => {

    const response = await fetch(`${API_URL}/register`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error al registrar usuario");
    }

    return data;
};

export const loginUser = async (credentials) => {

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
    }

    return data;
};

export const addBalance = async (amount) =>{
    const token = localStorage.getItem("token");

    const response = await fetch(
    `${API_URL}/balance`,
    {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            amount
        })
    }
    );

    const data = await response.json();

    if(!response.ok){
        throw new Error(
            data.message || "Error al cargar saldo"
        );
    }
    return data;
}

export const getProfile = async() =>{
     const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("No hay sesión activa");
    }

    const response = await fetch(
        `${API_URL}/profile`,
        {
            method: "GET",

            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "No se pudo obtener el perfil"
        );
    }

    return data;
}
export const snailPayCharge = async (paymentData) => {

    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("No hay una sesión activa");
    }

    const response = await fetch(
        `${SNAILPAY_URL}/charge`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(paymentData)
        }
    );

    const data = await response.json();

    if (!response.ok) {

        return {
            ...data,
            success: false
        };
    }

    return {
        ...data,
        success: true
    };
};