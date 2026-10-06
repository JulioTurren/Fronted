import { useState } from "react";
import { snailPayCharge } from "../services/usuarioService";
import "../styles/snailPayModal.css";

function SnailPayModal({
    isOpen,
    onClose,
    onBalanceUpdated
}) {

    const [formData, setFormData] = useState({
        card_number: "",
        expiration_date: "",
        cvv: "",
        full_name: "",
        amount: ""
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);


    if (!isOpen) {
        return null;
    }


    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setLoading(true);
        setResult(null);

        try {

            const response =
                await snailPayCharge({
                    card_number:
                        formData.card_number,

                    expiration_date:
                        formData.expiration_date,

                    cvv:
                        formData.cvv,

                    full_name:
                        formData.full_name,

                    amount:
                        Number(formData.amount)
                });

          //cobro

            if (
                response.success &&
                response.status === "approved"
            ) {

                localStorage.setItem(
                    "snailpay_card",
                    response.card_number
                );

                localStorage.setItem(
                    "snailpay_cvv",
                    response.cvv
                );

                const currentUser =
                    JSON.parse(
                        localStorage.getItem("user")
                    );

                const updatedUser = {
                    ...currentUser,
                    saldo: response.balance
                };


                localStorage.setItem(
                    "user",
                    JSON.stringify(updatedUser)
                );


                if (onBalanceUpdated) {
                    onBalanceUpdated(updatedUser);
                }


                setResult({
                    type: "success",
                    message:
                        response.status_detail,
                    transaction:
                        response
                });

                return;
            }

            if (response.status === "rejected") {

                setResult({
                    type: "error",
                    message:
                        response.status_detail,
                    transaction:
                        response
                });

                return;
            }


            if (
                response.status === "error" ||
                response.status === "system_error"
            ) {

                setResult({
                    type: "system",
                    message:
                        response.status_detail,
                    transaction:
                        response
                });

                return;
            }


            setResult({
                type: "error",
                message:
                    "No fue posible procesar la operación.",
                transaction:
                    response
            });


        } catch (error) {

            console.error(
                "Error SnailPay:",
                error
            );

            setResult({
                type: "system",
                message:
                    "No fue posible comunicarse con SnailPay."
            });

        } finally {

            setLoading(false);
        }
    };


    const handleClose = () => {

        setResult(null);

        setFormData({
            card_number: "",
            expiration_date: "",
            cvv: "",
            full_name: "",
            amount: ""
        });

        onClose();
    };


    return (
        <div className="snailpay-overlay">

            <div className="snailpay-modal">

                <button
                    className="snailpay-close"
                    onClick={handleClose}
                >
                    ×
                </button>


                <div className="snailpay-header">

                    <div className="snailpay-logo">
                        🐌
                    </div>

                    <div>
                        <h2>SnailPay</h2>

                        <p>
                            Recarga segura de saldo
                        </p>
                    </div>

                </div>


                {!result && (

                    <form
                        onSubmit={handleSubmit}
                        className="snailpay-form"
                    >

                        <div className="form-group">

                            <label>
                                Número de tarjeta
                            </label>

                            <input
                                type="text"
                                name="card_number"
                                value={
                                    formData.card_number
                                }
                                onChange={handleChange}
                                placeholder="1234 1234 1234 1234"
                                maxLength="16"
                                required
                            />

                        </div>


                        <div className="form-row">

                            <div className="form-group">

                                <label>
                                    Vencimiento
                                </label>

                                <input
                                    type="text"
                                    name="expiration_date"
                                    value={
                                        formData.expiration_date
                                    }
                                    onChange={handleChange}
                                    placeholder="12/26"
                                    maxLength="5"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    CVV
                                </label>

                                <input
                                    type="password"
                                    name="cvv"
                                    value={
                                        formData.cvv
                                    }
                                    onChange={handleChange}
                                    placeholder="543"
                                    maxLength="3"
                                    required
                                />

                            </div>

                        </div>


                        <div className="form-group">

                            <label>
                                Nombre completo
                            </label>

                            <input
                                type="text"
                                name="full_name"
                                value={
                                    formData.full_name
                                }
                                onChange={handleChange}
                                placeholder="Nombre del titular"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Monto de recarga
                            </label>

                            <div className="amount-input">

                                <span>$</span>

                                <input
                                    type="number"
                                    name="amount"
                                    value={
                                        formData.amount
                                    }
                                    onChange={handleChange}
                                    placeholder="500"
                                    min="1"
                                    step="0.01"
                                    required
                                />

                            </div>

                        </div>


                        <div className="snailpay-test-info">

                            <strong>
                                Datos de prueba
                            </strong>

                            <span>
                                Tarjeta: 1234123412341234
                            </span>

                            <span>
                                Vencimiento: 12/26
                            </span>

                            <span>
                                CVV: 543
                            </span>

                        </div>


                        <button
                            type="submit"
                            className="snailpay-submit"
                            disabled={loading}
                        >

                            {loading
                                ? "Procesando..."
                                : "Confirmar recarga"
                            }

                        </button>

                    </form>
                )}


                {result && (

                    <div
                        className={`snailpay-result ${result.type}`}
                    >

                        {result.type === "success" && (
                            <>
                                <div className="result-icon">
                                    ✓
                                </div>

                                <h3>
                                    ¡Operación aprobada!
                                </h3>

                                <p>
                                    {result.message}
                                </p>

                                {result.transaction && (
                                    <div className="transaction-info">

                                        <div>
                                            <span>
                                                Monto
                                            </span>

                                            <strong>
                                                $
                                                {Number(
                                                    result.transaction.transaction_amount
                                                ).toFixed(2)}
                                            </strong>
                                        </div>


                                        <div>
                                            <span>
                                                Nuevo saldo
                                            </span>

                                            <strong>
                                                $
                                                {Number(
                                                    result.transaction.balance
                                                ).toFixed(2)}
                                            </strong>
                                        </div>


                                        <div>
                                            <span>
                                                Referencia
                                            </span>

                                            <strong>
                                                {
                                                    result.transaction.reference
                                                }
                                            </strong>
                                        </div>


                                        <div>
                                            <span>
                                                Autorización
                                            </span>

                                            <strong>
                                                {
                                                    result.transaction.authorization_code
                                                }
                                            </strong>
                                        </div>

                                    </div>
                                )}
                            </>
                        )}


                        {result.type === "error" && (
                            <>
                                <div className="result-icon">
                                    !
                                </div>

                                <h3>
                                    Transacción rechazada
                                </h3>

                                <p>
                                    {result.message}
                                </p>
                            </>
                        )}


                        {result.type === "system" && (
                            <>
                                <div className="result-icon">
                                    !
                                </div>

                                <h3>
                                    Error de SnailPay
                                </h3>

                                <p>
                                    {result.message}
                                </p>

                                <small>
                                    No se realizó ningún cargo.
                                </small>
                            </>
                        )}


                        <button
                            className="snailpay-submit"
                            onClick={handleClose}
                        >
                            Cerrar
                        </button>

                    </div>
                )}

            </div>

        </div>
    );
}

export default SnailPayModal;