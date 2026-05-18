import { cn } from '../../lib/Utils'
import { useState } from 'react'

/**
 * @description a button that opens a modal with information about the project
 *
 */
export default function Info({ language = 'pt_BR' }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={cn(
                    'fixed z-20 bottom-8 right-8 rounded-full',
                    'size-12 flex items-center justify-center',
                    'border border-white/90 ring-2 ring-sky-500/80',
                    'bg-blue-500/60 text-white font-bold text-3xl',
                    'hover:bg-blue-600/90 focus:bg-blue-600/80',
                    'transition-colors duration-300 ease-in-out',
                )}
                aria-label={
                    isOpen
                        ? 'Close project info panel'
                        : 'Open project info panel'
                }
                type="button"
            >
                {isOpen ? '▾' : '?'}
            </button>
            <div
                className={cn(
                    'fixed bottom-0 left-0 right-0 mx-5 px-3 pt-3 pb-18 shadow-lg backdrop-blur-sm',
                    'max-h-[90vh] overflow-y-auto',
                    '[scrollbar-width:auto] [scrollbar-color:rgb(59_130_246)_transparent]',
                    'rounded-t-lg border-gray-600/90 dark:border-white/90',
                    'border-l border-t border-r',
                    'transition-transform duration-300 ease-in-out',
                    isOpen ? 'translate-y-0' : 'translate-y-[110%]',
                )}
            >
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                        {language === 'en_US'
                            ? 'Project Information and Development Notes'
                            : 'Informações do Projeto e Notas de Desenvolvimento'}
                    </h2>
                    {language === 'en_US' && (
                        <div>
                            {/* en_US */}
                            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-2">
                                Featured Program
                            </h2>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                This program is a direct evolution of the{' '}
                                <a
                                    href="https://arielfrajacomo.github.io/DevClub_Academy/Standalone_projects/Project07-RESTful_API/index.html"
                                    className="text-blue-500 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Challenge - Project 07 - Node+Mongo User
                                    Management
                                </a>
                                , with improved UI/UX and how I handled the
                                limitations of the RENDER.com free services.
                            </p>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50 mt-4 mb-2">
                                New Knowledge Acquired
                            </h2>
                            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                                <li>Setting up REACT</li>
                                <li>React Render features</li>
                                <li>(useSTATE, useEffect, ...)</li>
                                <li>Components and Routes</li>
                                <li>Render logic</li>
                                <li>... and more</li>
                            </ul>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50 mt-4 mb-2">
                                Tailwind
                            </h2>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                Surprisingly it works more or less like
                                bootstrap, I wasn't expecting that.
                                <br /> - It is simple, with less code written,
                                lightweight, but the ClassName grows{' '}
                                <em>out of control</em> very fast.
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                Transition effects made easy, Glass effects,
                                Inherent Light and Dark Themes.
                            </p>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50 mt-4 mb-2">
                                Bonus:
                            </h2>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                Site has pt_BR and us_EN localizations, all UI
                                changes to the selected language, URL have both
                                english and portuguese paths for SEO practices.
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                Animated background by{' '}
                                <a
                                    href="https://codepen.io/jaredstanley/pen/RwywQzG"
                                    className="text-blue-500 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Joseph Gentle
                                </a>
                                , he adapted Stefan Gustavson's original code to
                                JS, and I changed it to work as a React
                                component.
                            </p>
                        </div>
                    )}
                    {language === 'pt_BR' && (
                        <div>
                            {/* pt_BR */}
                            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-2">
                                Programa em Destaque
                            </h2>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Este programa é uma evolução direta do{' '}
                                <a
                                    href="https://arielfrajacomo.github.io/DevClub_Academy/Standalone_projects/Project07-RESTful_API/index.html"
                                    className="text-blue-500 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Desafio - Projeto 07 - Node+Mongo User
                                    Management
                                </a>{' '}
                                com melhorias de UI/UX e na forma como lidei com
                                as limitações do plano gratuito do RENDER.com.
                            </p>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50 mt-4 mb-2">
                                Novos Conhecimentos Adquiridos
                            </h2>
                            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                                <li>Configuração do REACT</li>
                                <li>Recursos de renderização do React</li>
                                <li>(useSTATE, useEffect, ...)</li>
                                <li>Componentes e Rotas</li>
                                <li>Lógica de renderização</li>
                                <li>... e mais</li>
                            </ul>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50 mt-4 mb-2">
                                Tailwind
                            </h2>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                Surpreendentemente funciona mais ou menos como o
                                bootstrap, nao era o que eu esperava.
                                <br />- É simples, com menos código escrito,
                                leve, mas o ClassName cresce{' '}
                                <em>fora de controle</em> bem rápido
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                Efeitos de transição facilitados, efeitos glass,
                                temas claro e escuro de forma nativa.
                            </p>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50 mt-4 mb-2">
                                Bonus:
                            </h2>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                O site possui localização pt_BR e en_US, toda a
                                UI muda conforme o idioma selecionado, e as URLs
                                possuem rotas em português e inglês para
                                práticas de SEO.
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                Fundo animado por{' '}
                                <a
                                    href="https://codepen.io/jaredstanley/pen/RwywQzG"
                                    className="text-blue-500 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Joseph Gentle
                                </a>{' '}
                                adaptando o código original de Stefan Gustavson
                                para JS, e eu o modifiquei para funcionar como
                                um componente React.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
