import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, BookOpen, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const quizSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type QuizFormData = z.infer<typeof quizSchema>;

const CreateEditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
  });

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/quizzes/${id}`)
        .then((response) => {
          setValue("title", response.data.title);
          setValue("description", response.data.description);
        })
        .catch(() => {
          toast.error("Failed to fetch quiz details.");
        })
        .finally(() => setLoading(false));
    }
  }, [id, setValue]);

 // When creating a new quiz (in your CreateEditQuiz component):
const onSubmit = async (data: QuizFormData) => {
    setLoading(true);
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/quizzes/${id}`, data);
        toast.success("Quiz updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/quizzes", {
          ...data,
          createdAt: new Date().toISOString() // Add timestamp
        });
        toast.success("Quiz created successfully!");
      }
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to save quiz.");
    }
    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="flex items-center mb-8">
            <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">
              {isEditing ? "Edit Quiz" : "Create New Quiz"}
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Label className="text-lg font-medium text-gray-700">
                Quiz Title
              </Label>
              <Input
                {...register("title")}
                type="text"
                placeholder="Enter an engaging quiz title"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Label className="text-lg font-medium text-gray-700">
                Quiz Description
              </Label>
              <Textarea
                {...register("description")}
                placeholder="Provide a detailed description of your quiz"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[120px]"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </motion.div>

            <div className="flex gap-4 pt-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  ) : (
                    <>
                      {isEditing ? "Update Quiz" : "Create Quiz"}
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateEditQuiz;