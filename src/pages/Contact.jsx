import React, { useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
    const [name, setName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !emailAddress || !message) {
        setStatus("Por favor, preencha todos os campos.");
        return;
    }

    const templateParams = {
        from_name: name,
        from_email: emailAddress,
        message: message,
    };

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams, "YOUR_USER_ID").then(
    (response) => {
        setStatus("Mensagem enviada com sucesso!");
        setName("");
        setEmailAddress("");
        setMessage("");
    },
    (error) => {
        setStatus("Erro ao enviar a mensagem. Tente novamente.");
        console.error("Erro ao enviar email:", error);
    }
    );
};

    return (
    <div className="p-4 justify-center align-middle items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Você tem ideias? Nós temos soluções, entre em contato!</h1>
        <p className="text-lg text-gray-600 mb-6">Sua opinião é muito importante para nós! Fale pra nós o que está pensando, você pode enviar sugestões, melhorias ou até mesmo propostas relacionadas à nossa plataforma de monitoramento de clima. Queremos garantir que a dashboard seja a melhor ferramenta para acompanhar os dados de sensores de temperatura, umidade e clima de diversos locais da cidade.</p>
        <form onSubmit={handleSubmit} className=" mx-auto mt-16">
            {/* Input de Nome */}
            <div className="mb-6">
                <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent placeholder:text-gray-600 text-gray-800 p-2 border-b-2 border-blue-300 focus:outline-none focus:border-blue-500 text-lg"
                />
            </div>

            {/* Input de E-mail */}
            <div className="mb-6">
                <input
                type="email"
                placeholder="Seu e-mail"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="w-full bg-transparent placeholder:text-gray-600 text-gray-800 p-2 border-b-2 border-blue-300 focus:outline-none focus:border-blue-500 text-lg"
                />
            </div>

            {/* Textarea para Mensagem */}
            <div className="mb-6">
                <textarea
                placeholder="Sua mensagem"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent placeholder:text-gray-600 text-gray-800 p-2 border-b-2 border-blue-300 focus:outline-none focus:border-blue-500 text-lg resize-none"
                />
            </div>

            <div className="flex justify-between items-end mt-6">
                <div className="">
                    <p className="text-gray-700 text-lg mb-2">Categoria da mensagem:</p>
                    <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                        <input
                        type="checkbox"
                        value="Sugestão"
                        className="form-checkbox text-blue-500"
                        />
                        <span className="text-gray-800">Sugestão</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                        type="checkbox"
                        value="Proposta"
                        className="form-checkbox text-blue-500"
                        />
                        <span className="text-gray-800">Proposta</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                        type="checkbox"
                        value="Outros"
                        className="form-checkbox text-blue-500"
                        />
                        <span className="text-gray-800">Melhoria</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                        type="checkbox"
                        value="Outros"
                        className="form-checkbox text-blue-500"
                        />
                        <span className="text-gray-800">Outros</span>
                    </label>
                    </div>
                </div>

                {/* Botão de Enviar */}
                <button
                    type="submit"
                    className="w-1/4 h-12 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-950"
                >
                    ENVIAR
            </button>
            </div>
        </form>
        {status && <p className="text-center mt-4 text-lg font-semibold text-gray-600">{status}</p>}
    </div>
    );
};

export default Contact;
