import AiInnovationsNewsletterClient from './components/AiInnovationsNewsletterClient';

export default function AiInnovationsNewsletterPage() {
    const post = {
        title: "AI in Action: How New Tools Reshaped Industries in November 2025",
        date: "2025-12-12",
    };

    const sections = [
        { id: 'software-development', title: 'Software Development', imageUrl: '/BlogImg1.png' },
        { id: 'creative-design', title: 'Creative & Design', imageUrl: '/BlogImg2.png' },
        { id: 'customer-experience', title: 'Customer Experience', imageUrl: '/BlogImg3.png' },
    ];

    return <AiInnovationsNewsletterClient post={post} sections={sections} />;
}

