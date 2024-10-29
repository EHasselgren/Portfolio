interface TextSectionProps {
  text: string;
}

export default function TextSection({ text }: TextSectionProps) {
  return (
    <p className="text-xl text-gray-700 mb-4 font-['Poppins']">
      {text}
    </p>
  );
}
