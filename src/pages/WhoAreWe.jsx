import { LinkedinLogo } from "@phosphor-icons/react";
import React from "react";

const teamMembers = [
    {
        name: 'João Samuel Gomes',
        role: 'Scrum Master, Desenvolvedor Front-End',
        image: '/src/images/joao.jpg',
        linkedin: 'https://www.linkedin.com/in/joaosamuelgomes/',
    },
    {
        name: 'Douglas Bosse',
        role: 'Desenvolvedor Back-End',
        image: '/src/images/douglas.jpeg',
        linkedin: 'https://www.linkedin.com',
    },
    {
        name: 'Leonardo Meotti',
        role: 'Product Owner, Analista de Requisitos',
        image: '/src/images/meotti.jpg',
        linkedin: 'https://www.linkedin.com',
    },
    {
        name: 'Jean Schäffel Moreira',
        role: 'Especialista em Banco de Dados',
        image: '/src/images/jean.jpg',
        linkedin: 'https://www.linkedin.com/in/jean-sch%C3%A4ffel-moreira-70142a236/',
    },
];

function WhoAreWe() {
    return (
        <div className="p-4 justify-center align-middle items-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Quem somos?</h1>
            <p className="text-lg text-gray-600 mb-12">
                Somos uma equipe especializada no desenvolvimento de soluções inovadoras para o monitoramento de dados meteorológicos. Nosso foco é fornecer informações precisas e em tempo real, ajudando nossos parceiros a tomar decisões fundamentadas. Conheça os profissionais responsáveis pelo sucesso de nossos projetos.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-auto">
                {teamMembers.map((member, index) => (
                <div key={index} className="flex flex-col items-center p-6 rounded-lg">
                    <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mb-4 object-cover border border-blue-500 hover:shadow-md hover:shadow-blue-300"
                    />
                    <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{member.role}</p>
                    <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                    >
                    <LinkedinLogo size={32} />
                    </a>
                </div>
                ))}
            </div>
        </div>
    );
}

export default WhoAreWe;
