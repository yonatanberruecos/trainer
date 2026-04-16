'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/app/context/I18nProvider';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type Tab = 'privacy' | 'terms';

const EFFECTIVE_DATE_EN = 'April 20, 2026';
const EFFECTIVE_DATE_ES = '20 de abril de 2026';
const CONTACT_EMAIL = 'genfit2026@gmail.com';

export default function PrivacyPage() {
    const { t, locale } = useI18n();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<Tab>('privacy');
    const isEs = locale === 'es';

    useEffect(() => {
        if (searchParams.get('tab') === 'terms') {
            setActiveTab('terms');
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
            {/* Hero Header */}
            <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} className="py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
                        {t('privacy.pageTitle')}
                    </h1>
                    <p className="text-indigo-100 text-sm md:text-base">
                        {t('privacy.effectiveDate')}: {isEs ? EFFECTIVE_DATE_ES : EFFECTIVE_DATE_EN}
                    </p>
                </div>
            </div>

            {/* Tab Bar */}
            <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-4xl mx-auto flex">
                    <button
                        onClick={() => setActiveTab('privacy')}
                        className={`flex-1 py-4 text-sm font-semibold transition-all duration-200 border-b-2 ${
                            activeTab === 'privacy'
                                ? 'border-indigo-600 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        {t('privacy.privacyTab')}
                    </button>
                    <button
                        onClick={() => setActiveTab('terms')}
                        className={`flex-1 py-4 text-sm font-semibold transition-all duration-200 border-b-2 ${
                            activeTab === 'terms'
                                ? 'border-indigo-600 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        {t('privacy.termsTab')}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-10 pb-32">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                    {/* ── Privacy Policy ── */}
                    {activeTab === 'privacy' && (
                        isEs ? <PrivacyPolicyES email={CONTACT_EMAIL} /> : <PrivacyPolicyEN email={CONTACT_EMAIL} />
                    )}

                    {/* ── Terms of Service ── */}
                    {activeTab === 'terms' && (
                        isEs ? <TermsOfServiceES email={CONTACT_EMAIL} /> : <TermsOfServiceEN email={CONTACT_EMAIL} />
                    )}
                </div>

                {/* Back link */}
                <div className="mt-6 text-center">
                    <Link href="/fit" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                        ← {t('common.back')}
                    </Link>
                </div>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════
   PRIVACY POLICY — ENGLISH
══════════════════════════════════════════════ */
function PrivacyPolicyEN({ email }: { email: string }) {
    return (
        <article className="p-6 md:p-10">
            <PolicySection number="1" title="Introduction">
                <p>Welcome to our fitness application (&quot;Trainix&quot;). This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our services.</p>
                <p>This policy is designed to comply with:</p>
                <ul>
                    <li>Colombian data protection law (Law 1581 of 2012 and related regulations – Habeas Data)</li>
                    <li>International standards including the General Data Protection Regulation (GDPR) where applicable</li>
                    <li>Platform requirements, including YouTube API Services policies</li>
                </ul>
                <p>By using the App, you agree to the practices described in this Privacy Policy.</p>
            </PolicySection>

            <PolicySection number="2" title="Information We Collect">
                <p>We may collect the following categories of data:</p>
                <ul>
                    <li><strong>Personal Information:</strong> Name, email address, and account credentials</li>
                    <li><strong>Fitness &amp; Profile Data:</strong> Age, height, weight, fitness goals, training preferences, and other inputs voluntarily provided</li>
                    <li><strong>Usage Data:</strong> Interactions with the App, generated workout routines, and viewed exercises</li>
                    <li><strong>Technical Data:</strong> IP address, device type, browser, and operating system</li>
                </ul>
                <p>We only collect data necessary to provide and improve the service.</p>
            </PolicySection>

            <PolicySection number="3" title="How We Use Your Information">
                <p>We use collected data to:</p>
                <ul>
                    <li>Generate personalized workout routines using AI/LLM models</li>
                    <li>Deliver relevant exercise recommendations</li>
                    <li>Improve model performance and user experience</li>
                    <li>Provide customer support</li>
                    <li>Ensure security and prevent fraud</li>
                    <li>Comply with legal obligations</li>
                </ul>
            </PolicySection>

            <PolicySection number="4" title="Use of YouTube API Services">
                <p>Our App uses YouTube API Services to display exercise videos.</p>
                <p>By using the App, you agree to be bound by:</p>
                <ul>
                    <li>
                        YouTube Terms of Service:{' '}
                        <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">
                            https://www.youtube.com/t/terms
                        </a>
                    </li>
                    <li>
                        Google Privacy Policy:{' '}
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                            https://policies.google.com/privacy
                        </a>
                    </li>
                </ul>
                <p>We do not store or control YouTube video content. Any data collected by YouTube is governed by Google&apos;s own policies.</p>
            </PolicySection>

            <PolicySection number="5" title="Legal Basis for Processing (International Users)">
                <p>Where GDPR applies, we process your data under the following bases:</p>
                <ul>
                    <li>Consent (when you provide personal and fitness data)</li>
                    <li>Legitimate interest (to improve and operate the service)</li>
                    <li>Legal obligation (when required by law)</li>
                </ul>
            </PolicySection>

            <PolicySection number="6" title="Data Sharing and Disclosure">
                <p>We do not sell personal data.</p>
                <p>We may share data with:</p>
                <ul>
                    <li>Service providers (hosting, analytics, infrastructure)</li>
                    <li>Legal authorities when required</li>
                    <li>Third-party APIs strictly necessary for functionality (e.g., YouTube API)</li>
                </ul>
                <p>All third parties are required to handle data securely.</p>
            </PolicySection>

            <PolicySection number="7" title="International Data Transfers">
                <p>Your information may be processed outside Colombia. In such cases, we ensure appropriate safeguards in line with Colombian law and international standards.</p>
            </PolicySection>

            <PolicySection number="8" title="Data Security">
                <p>We implement administrative, technical, and organizational measures to protect your data. However, no system is completely secure.</p>
            </PolicySection>

            <PolicySection number="9" title="Data Retention">
                <p>We retain personal data only as long as necessary to:</p>
                <ul>
                    <li>Provide the service</li>
                    <li>Comply with legal obligations</li>
                    <li>Resolve disputes</li>
                </ul>
            </PolicySection>

            <PolicySection number="10" title="Your Rights">
                <p>Under Colombian law and applicable international laws, you have the right to:</p>
                <ul>
                    <li>Access your personal data</li>
                    <li>Request correction or updates</li>
                    <li>Request deletion of your data</li>
                    <li>Revoke consent</li>
                </ul>
                <p>Requests can be submitted via the contact email below.</p>
            </PolicySection>

            <PolicySection number="11" title="Children's Privacy">
                <p>The App is not intended for individuals under 13 years of age. We do not knowingly collect data from minors.</p>
            </PolicySection>

            <PolicySection number="12" title="Changes to This Policy">
                <p>We may update this Privacy Policy periodically. Updates will be posted within the App.</p>
            </PolicySection>

            <PolicySection number="13" title="Data Deletion Instructions">
                <p>You have the right to request the deletion of your personal data at any time.</p>
                <SubHeading>How to Request Deletion</SubHeading>
                <p>You may request deletion by:</p>
                <ul>
                    <li>Sending an email to: <EmailHighlight email={email} /></li>
                    <li>Including the subject line: &quot;Data Deletion Request&quot;</li>
                    <li>Providing sufficient information to verify your identity (e.g., registered email)</li>
                </ul>
                <SubHeading>What Happens After Your Request</SubHeading>
                <ul>
                    <li>We will acknowledge your request within a reasonable timeframe</li>
                    <li>Your data will be deleted or anonymized within a maximum of 15 business days, unless legal obligations require retention</li>
                    <li>You will receive confirmation once the deletion is completed</li>
                </ul>
                <SubHeading>Scope of Deletion</SubHeading>
                <p>Upon request, we will delete:</p>
                <ul>
                    <li>Personal account information</li>
                    <li>Fitness and profile data</li>
                    <li>Usage history associated with your account</li>
                </ul>
                <p>We may retain limited information where required for legal compliance, fraud prevention, or enforcement of our Terms.</p>
                <SubHeading>Third-Party Data</SubHeading>
                <p>If your data has been shared with third-party services (e.g., YouTube API), deletion of such data is subject to their respective policies. We do not control data stored by third parties.</p>
            </PolicySection>

            <PolicySection number="14" title="Contact Information" last>
                <p>For privacy-related inquiries or data requests:</p>
                <p>Email: <EmailHighlight email={email} /></p>
            </PolicySection>
        </article>
    );
}

/* ══════════════════════════════════════════════
   PRIVACY POLICY — SPANISH
══════════════════════════════════════════════ */
function PrivacyPolicyES({ email }: { email: string }) {
    return (
        <article className="p-6 md:p-10">
            <PolicySection number="1" title="Introducción">
                <p>Bienvenido a nuestra aplicación de fitness (&quot;Trainix&quot;). Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos tu información cuando utilizas nuestros servicios.</p>
                <p>Esta política está diseñada para cumplir con:</p>
                <ul>
                    <li>La ley colombiana de protección de datos (Ley 1581 de 2012 y regulaciones relacionadas – Habeas Data)</li>
                    <li>Estándares internacionales, incluyendo el Reglamento General de Protección de Datos (RGPD) donde aplique</li>
                    <li>Requisitos de plataformas, incluyendo las políticas de YouTube API Services</li>
                </ul>
                <p>Al usar la App, aceptas las prácticas descritas en esta Política de Privacidad.</p>
            </PolicySection>

            <PolicySection number="2" title="Información que Recopilamos">
                <p>Podemos recopilar las siguientes categorías de datos:</p>
                <ul>
                    <li><strong>Información Personal:</strong> Nombre, correo electrónico y credenciales de cuenta</li>
                    <li><strong>Datos de Fitness y Perfil:</strong> Edad, estatura, peso, objetivos de fitness, preferencias de entrenamiento y otras entradas proporcionadas voluntariamente</li>
                    <li><strong>Datos de Uso:</strong> Interacciones con la App, rutinas de entrenamiento generadas y ejercicios visualizados</li>
                    <li><strong>Datos Técnicos:</strong> Dirección IP, tipo de dispositivo, navegador y sistema operativo</li>
                </ul>
                <p>Solo recopilamos los datos necesarios para proporcionar y mejorar el servicio.</p>
            </PolicySection>

            <PolicySection number="3" title="Cómo Usamos tu Información">
                <p>Usamos los datos recopilados para:</p>
                <ul>
                    <li>Generar rutinas de entrenamiento personalizadas mediante modelos de IA/LLM</li>
                    <li>Ofrecer recomendaciones de ejercicios relevantes</li>
                    <li>Mejorar el rendimiento del modelo y la experiencia del usuario</li>
                    <li>Brindar soporte al cliente</li>
                    <li>Garantizar la seguridad y prevenir el fraude</li>
                    <li>Cumplir con las obligaciones legales</li>
                </ul>
            </PolicySection>

            <PolicySection number="4" title="Uso de los Servicios de YouTube API">
                <p>Nuestra App utiliza YouTube API Services para mostrar videos de ejercicios.</p>
                <p>Al usar la App, aceptas estar vinculado por:</p>
                <ul>
                    <li>
                        Términos de Servicio de YouTube:{' '}
                        <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">
                            https://www.youtube.com/t/terms
                        </a>
                    </li>
                    <li>
                        Política de Privacidad de Google:{' '}
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                            https://policies.google.com/privacy
                        </a>
                    </li>
                </ul>
                <p>No almacenamos ni controlamos el contenido de videos de YouTube. Los datos recopilados por YouTube se rigen por las políticas propias de Google.</p>
            </PolicySection>

            <PolicySection number="5" title="Base Legal para el Tratamiento (Usuarios Internacionales)">
                <p>Donde aplique el RGPD, procesamos tus datos bajo las siguientes bases:</p>
                <ul>
                    <li>Consentimiento (cuando proporcionas datos personales y de fitness)</li>
                    <li>Interés legítimo (para mejorar y operar el servicio)</li>
                    <li>Obligación legal (cuando lo exija la ley)</li>
                </ul>
            </PolicySection>

            <PolicySection number="6" title="Compartición y Divulgación de Datos">
                <p>No vendemos datos personales.</p>
                <p>Podemos compartir datos con:</p>
                <ul>
                    <li>Proveedores de servicios (alojamiento, analítica, infraestructura)</li>
                    <li>Autoridades legales cuando sea requerido</li>
                    <li>APIs de terceros estrictamente necesarias para la funcionalidad (p. ej., YouTube API)</li>
                </ul>
                <p>Todos los terceros están obligados a manejar los datos de forma segura.</p>
            </PolicySection>

            <PolicySection number="7" title="Transferencias Internacionales de Datos">
                <p>Tu información puede ser procesada fuera de Colombia. En tales casos, garantizamos las salvaguardas adecuadas conforme a la ley colombiana y los estándares internacionales.</p>
            </PolicySection>

            <PolicySection number="8" title="Seguridad de los Datos">
                <p>Implementamos medidas administrativas, técnicas y organizativas para proteger tus datos. Sin embargo, ningún sistema es completamente seguro.</p>
            </PolicySection>

            <PolicySection number="9" title="Retención de Datos">
                <p>Conservamos los datos personales solo el tiempo necesario para:</p>
                <ul>
                    <li>Proveer el servicio</li>
                    <li>Cumplir con obligaciones legales</li>
                    <li>Resolver disputas</li>
                </ul>
            </PolicySection>

            <PolicySection number="10" title="Tus Derechos">
                <p>Bajo la ley colombiana y las leyes internacionales aplicables, tienes derecho a:</p>
                <ul>
                    <li>Acceder a tus datos personales</li>
                    <li>Solicitar corrección o actualización</li>
                    <li>Solicitar la eliminación de tus datos</li>
                    <li>Revocar el consentimiento</li>
                </ul>
                <p>Las solicitudes pueden enviarse al correo de contacto indicado a continuación.</p>
            </PolicySection>

            <PolicySection number="11" title="Privacidad de Menores">
                <p>La App no está dirigida a personas menores de 13 años. No recopilamos datos de menores de manera consciente.</p>
            </PolicySection>

            <PolicySection number="12" title="Cambios a Esta Política">
                <p>Podemos actualizar esta Política de Privacidad periódicamente. Las actualizaciones se publicarán dentro de la App.</p>
            </PolicySection>

            <PolicySection number="13" title="Instrucciones para la Eliminación de Datos">
                <p>Tienes derecho a solicitar la eliminación de tus datos personales en cualquier momento.</p>
                <SubHeading>Cómo Solicitar la Eliminación</SubHeading>
                <p>Puedes solicitar la eliminación:</p>
                <ul>
                    <li>Enviando un correo a: <EmailHighlight email={email} /></li>
                    <li>Con el asunto: &quot;Solicitud de Eliminación de Datos&quot;</li>
                    <li>Proporcionando información suficiente para verificar tu identidad (p. ej., correo registrado)</li>
                </ul>
                <SubHeading>Qué Sucede Después de tu Solicitud</SubHeading>
                <ul>
                    <li>Acusaremos recibo de tu solicitud en un plazo razonable</li>
                    <li>Tus datos serán eliminados o anonimizados en un máximo de 15 días hábiles, salvo que obligaciones legales requieran su retención</li>
                    <li>Recibirás confirmación una vez completada la eliminación</li>
                </ul>
                <SubHeading>Alcance de la Eliminación</SubHeading>
                <p>Ante tu solicitud, eliminaremos:</p>
                <ul>
                    <li>Información personal de la cuenta</li>
                    <li>Datos de fitness y perfil</li>
                    <li>Historial de uso asociado a tu cuenta</li>
                </ul>
                <p>Podemos conservar información limitada donde sea requerido por cumplimiento legal, prevención de fraude o aplicación de nuestros Términos.</p>
                <SubHeading>Datos de Terceros</SubHeading>
                <p>Si tus datos han sido compartidos con servicios de terceros (p. ej., YouTube API), la eliminación de dichos datos está sujeta a sus respectivas políticas. No controlamos los datos almacenados por terceros.</p>
            </PolicySection>

            <PolicySection number="14" title="Información de Contacto" last>
                <p>Para consultas relacionadas con privacidad o solicitudes de datos:</p>
                <p>Correo: <EmailHighlight email={email} /></p>
            </PolicySection>
        </article>
    );
}

/* ══════════════════════════════════════════════
   TERMS OF SERVICE — ENGLISH
══════════════════════════════════════════════ */
function TermsOfServiceEN({ email }: { email: string }) {
    return (
        <article className="p-6 md:p-10">
            <PolicySection number="1" title="Acceptance of Terms">
                <p>By accessing or using the App, you agree to these Terms of Service.</p>
            </PolicySection>

            <PolicySection number="2" title="Description of Service">
                <p>The App provides AI-generated personalized workout routines based on user-provided data and displays exercise videos using YouTube API Services.</p>
            </PolicySection>

            <PolicySection number="3" title="Eligibility">
                <p>You must be at least 13 years old to use this App.</p>
            </PolicySection>

            <PolicySection number="4" title="User Responsibilities">
                <p>You agree to:</p>
                <ul>
                    <li>Provide accurate and truthful information</li>
                    <li>Use the App only for lawful purposes</li>
                    <li>Not attempt to interfere with or disrupt the service</li>
                </ul>
            </PolicySection>

            <PolicySection number="5" title="Health Disclaimer">
                <WarningBox>
                    The App provides fitness recommendations for <strong>informational purposes only</strong>. It does not constitute medical advice, diagnosis, or treatment. You should consult a qualified healthcare professional before starting any fitness program. Use of the App is at your own risk.
                </WarningBox>
            </PolicySection>

            <PolicySection number="6" title="YouTube API Services Compliance">
                <p>The App uses YouTube API Services. By using the App, you agree to comply with:</p>
                <ul>
                    <li>
                        <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">
                            YouTube Terms of Service
                        </a>
                    </li>
                    <li>
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                            Google Privacy Policy
                        </a>
                    </li>
                </ul>
                <p>We do not control or guarantee the accuracy, relevance, or availability of third-party video content.</p>
            </PolicySection>

            <PolicySection number="7" title="Intellectual Property">
                <p>All App content (excluding third-party content such as YouTube videos) is owned by us or licensed to us. You may not copy, modify, or distribute it without permission.</p>
            </PolicySection>

            <PolicySection number="8" title="Limitation of Liability">
                <p>To the maximum extent permitted by law:</p>
                <ul>
                    <li>We are not liable for injuries resulting from workouts</li>
                    <li>We are not responsible for third-party content</li>
                    <li>We are not liable for indirect or consequential damages</li>
                </ul>
            </PolicySection>

            <PolicySection number="9" title="Termination">
                <p>We may suspend or terminate access if you violate these Terms.</p>
            </PolicySection>

            <PolicySection number="10" title="Governing Law">
                <p>These Terms are governed by the laws of Colombia. For international users, local consumer protection laws may also apply where required.</p>
            </PolicySection>

            <PolicySection number="11" title="Modifications">
                <p>We may update these Terms at any time. Continued use of the App constitutes acceptance of the updated Terms.</p>
            </PolicySection>

            <PolicySection number="12" title="Contact" last>
                <p>For legal or support inquiries:</p>
                <p>Email: <EmailHighlight email={email} /></p>
            </PolicySection>
        </article>
    );
}

/* ══════════════════════════════════════════════
   TERMS OF SERVICE — SPANISH
══════════════════════════════════════════════ */
function TermsOfServiceES({ email }: { email: string }) {
    return (
        <article className="p-6 md:p-10">
            <PolicySection number="1" title="Aceptación de los Términos">
                <p>Al acceder o utilizar la App, aceptas estos Términos de Servicio.</p>
            </PolicySection>

            <PolicySection number="2" title="Descripción del Servicio">
                <p>La App proporciona rutinas de entrenamiento personalizadas generadas por IA basadas en los datos proporcionados por el usuario y muestra videos de ejercicios mediante YouTube API Services.</p>
            </PolicySection>

            <PolicySection number="3" title="Elegibilidad">
                <p>Debes tener al menos 13 años para usar esta App.</p>
            </PolicySection>

            <PolicySection number="4" title="Responsabilidades del Usuario">
                <p>Aceptas:</p>
                <ul>
                    <li>Proporcionar información precisa y veraz</li>
                    <li>Usar la App solo para fines legales</li>
                    <li>No intentar interferir con ni interrumpir el servicio</li>
                </ul>
            </PolicySection>

            <PolicySection number="5" title="Aviso de Salud">
                <WarningBox>
                    La App proporciona recomendaciones de fitness <strong>únicamente con fines informativos</strong>. No constituye consejo médico, diagnóstico ni tratamiento. Debes consultar a un profesional de la salud calificado antes de comenzar cualquier programa de fitness. El uso de la App es bajo tu propio riesgo.
                </WarningBox>
            </PolicySection>

            <PolicySection number="6" title="Cumplimiento con YouTube API Services">
                <p>La App utiliza YouTube API Services. Al usar la App, aceptas cumplir con:</p>
                <ul>
                    <li>
                        <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">
                            Términos de Servicio de YouTube
                        </a>
                    </li>
                    <li>
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                            Política de Privacidad de Google
                        </a>
                    </li>
                </ul>
                <p>No controlamos ni garantizamos la exactitud, relevancia o disponibilidad del contenido de video de terceros.</p>
            </PolicySection>

            <PolicySection number="7" title="Propiedad Intelectual">
                <p>Todo el contenido de la App (excluyendo contenido de terceros como videos de YouTube) es de nuestra propiedad o está licenciado a nosotros. No puedes copiarlo, modificarlo ni distribuirlo sin permiso.</p>
            </PolicySection>

            <PolicySection number="8" title="Limitación de Responsabilidad">
                <p>En la máxima medida permitida por la ley:</p>
                <ul>
                    <li>No somos responsables de lesiones derivadas de los entrenamientos</li>
                    <li>No somos responsables del contenido de terceros</li>
                    <li>No somos responsables de daños indirectos o consecuentes</li>
                </ul>
            </PolicySection>

            <PolicySection number="9" title="Terminación">
                <p>Podemos suspender o cancelar el acceso si violas estos Términos.</p>
            </PolicySection>

            <PolicySection number="10" title="Ley Aplicable">
                <p>Estos Términos se rigen por las leyes de Colombia. Para usuarios internacionales, también pueden aplicarse las leyes locales de protección al consumidor donde sea requerido.</p>
            </PolicySection>

            <PolicySection number="11" title="Modificaciones">
                <p>Podemos actualizar estos Términos en cualquier momento. El uso continuado de la App constituye la aceptación de los Términos actualizados.</p>
            </PolicySection>

            <PolicySection number="12" title="Contacto" last>
                <p>Para consultas legales o de soporte:</p>
                <p>Correo: <EmailHighlight email={email} /></p>
            </PolicySection>
        </article>
    );
}

/* ══════════════════════════════════════════════
   Shared sub-components
══════════════════════════════════════════════ */
function PolicySection({
    number,
    title,
    children,
    last = false,
}: {
    number: string;
    title: string;
    children: React.ReactNode;
    last?: boolean;
}) {
    return (
        <section className={`${last ? '' : 'border-b border-gray-100 mb-8 pb-8'}`}>
            <h2 className="flex items-center gap-3 text-lg md:text-xl font-bold text-gray-900 mb-4">
                <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                >
                    {number}
                </span>
                {title}
            </h2>
            <div className="pl-11 text-gray-600 leading-relaxed space-y-3 text-sm md:text-base [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-indigo-600 [&_a:hover]:underline">
                {children}
            </div>
        </section>
    );
}

function SubHeading({ children }: { children: React.ReactNode }) {
    return (
        <h4 className="font-semibold text-gray-800 mt-4 mb-1">{children}</h4>
    );
}

function EmailHighlight({ email }: { email: string }) {
    return <span className="font-medium text-indigo-600">{email}</span>;
}

function WarningBox({ children }: { children: React.ReactNode }) {
    return (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800 text-sm leading-relaxed">
            <div className="flex gap-3">
                <span className="text-xl flex-shrink-0">⚠️</span>
                <p>{children}</p>
            </div>
        </div>
    );
}
