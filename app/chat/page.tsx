import Chat from './chat-component';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Learning Tutor</h1>
            <p className="text-gray-600">Ask me about JavaScript, React, web development, or programming concepts</p>
          </div>
          <div className="flex gap-4">
            <a 
              href="/admin" 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Admin Dashboard
            </a>
          </div>
        </div>
      </header>
      <main className="h-[calc(100vh-120px)]">
        <Chat />
      </main>
    </div>
  );
}
