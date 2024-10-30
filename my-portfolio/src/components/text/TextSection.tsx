interface TextSectionProps {
  text: string;
}

export default function TextSection({ text }: TextSectionProps) {
  return (
    <p className="bg-gradient-to-r from-slate-700 to-blue-700 text-transparent bg-clip-text text-xl mb-4 font-['Poppins']">
      {text}
    </p>
  );
}
