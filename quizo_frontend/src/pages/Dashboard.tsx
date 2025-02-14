import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Pencil, Trash, Book, Search } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

interface Quiz {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/quizzes");
      setQuizzes(response.data);
    } catch {
      toast.error("Failed to load quizzes.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/quizzes/${id}`);
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
      toast.success("Quiz deleted successfully!");
    } catch {
      toast.error("Failed to delete quiz.");
    }
    setLoading(false);
  };

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSortedQuizzes = () => {
    let sorted = [...filteredQuizzes];
    
    switch (filter) {
      case 'recent':
        return sorted.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case 'oldest':
        return sorted.sort((a, b) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      default:
        return sorted;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6"
        >
          {/* Improved Header Section with Better Responsive Layout */}
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center mb-6">
            <div className="flex items-center">
              <Book className="w-8 h-8 text-blue-600 mr-2" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Quiz Dashboard</h2>
            </div>
            
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => navigate("/create")}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >
                  Create New Quiz
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full sm:w-auto px-6 py-2 rounded-lg flex items-center justify-center gap-2 text-gray-700 hover:text-red-600 hover:border-red-600"
                >
                  Logout
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search quizzes..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Quizzes</option>
              <option value="recent">Recent</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin w-12 h-12 text-blue-600" />
          </div>
        ) : (
          /* Quiz Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getSortedQuizzes().map((quiz) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {quiz.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{quiz.description}</p>
                      {/* <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                          10 Questions
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                          5 mins
                        </span>
                      </div> */}
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div className="text-sm text-gray-400">
                          {formatDate(quiz.created_at)}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                            onClick={() => navigate(`/edit/${quiz.id}`)}
                          >
                            <Pencil className="w-4 h-4 mr-1" /> Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="bg-red-50 text-red-600 hover:bg-red-100"
                            onClick={() => handleDelete(quiz.id)}
                          >
                            <Trash className="w-4 h-4 mr-1" /> Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;