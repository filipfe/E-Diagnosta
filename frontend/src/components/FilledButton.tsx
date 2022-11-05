export default function FilledButton({ children }: any) {
    return <button className="bg-primary transition-colors max-w-max font-medium hover:bg-darkPrimary text-white rounded flex items-center py-2 px-6">{children}</button>
}