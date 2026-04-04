import { useState } from "react";
import {
  Button,
  Tabs,
  Input,
  Switch,
  Card,
  Spin,
  message,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";

const CMSArticles = () => {
  const [activeTab, setActiveTab] = useState("featured");
  const [messageApi, contextHolder] = message.useMessage();

  const [articlesData, setArticlesData] = useState({
    featured: {
      title: "Featured",
      content: "This month",
      isVisible: true,
    },
    popular: {
      title: "Popular",
      content: "This month",
      isVisible: true,
    },
    recently: {
      title: "Recently Posted",
      isVisible: true,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Saving Articles Data:", articlesData);
      messageApi.success("Articles settings saved successfully!");
    } catch {
      messageApi.error("Failed to save articles settings");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      {contextHolder}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Articles Management</h1>
        <p className="text-gray-600">Manage articles sections content and visibility</p>
      </div>

      <Card className="shadow-lg border-none">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: "featured",
              label: "Featured Section",
              children: (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-lg font-semibold">Featured Visibility</label>
                    <Switch
                      checked={articlesData.featured.isVisible}
                      onChange={(checked) => 
                        setArticlesData(prev => ({ 
                          ...prev, 
                          featured: { ...prev.featured, isVisible: checked } 
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Featured Title
                    </label>
                    <Input
                      value={articlesData.featured.title}
                      onChange={(e) => 
                        setArticlesData(prev => ({ 
                          ...prev, 
                          featured: { ...prev.featured, title: e.target.value } 
                        }))
                      }
                      placeholder="Enter featured title"
                      className="max-w-2xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Featured Content
                    </label>
                    <Input
                      value={articlesData.featured.content}
                      onChange={(e) => 
                        setArticlesData(prev => ({ 
                          ...prev, 
                          featured: { ...prev.featured, content: e.target.value } 
                        }))
                      }
                      placeholder="Enter featured content"
                      className="max-w-2xl"
                    />
                  </div>
                </div>
              ),
            },
            {
              key: "popular",
              label: "Popular Section",
              children: (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-lg font-semibold">Popular Visibility</label>
                    <Switch
                      checked={articlesData.popular.isVisible}
                      onChange={(checked) => 
                        setArticlesData(prev => ({ 
                          ...prev, 
                          popular: { ...prev.popular, isVisible: checked } 
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Popular Title
                    </label>
                    <Input
                      value={articlesData.popular.title}
                      onChange={(e) => 
                        setArticlesData(prev => ({ 
                          ...prev, 
                          popular: { ...prev.popular, title: e.target.value } 
                        }))
                      }
                      placeholder="Enter popular title"
                      className="max-w-2xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Popular Content
                    </label>
                    <Input
                      value={articlesData.popular.content}
                      onChange={(e) => 
                        setArticlesData(prev => ({ 
                          ...prev, 
                          popular: { ...prev.popular, content: e.target.value } 
                        }))
                      }
                      placeholder="Enter popular content"
                      className="max-w-2xl"
                    />
                  </div>
                </div>
              ),
            },
            {
              key: "recently",
              label: "Recently Posted Section",
              children: (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-lg font-semibold">Recently Posted Visibility</label>
                    <Switch
                      checked={articlesData.recently.isVisible}
                      onChange={(checked) => 
                        setArticlesData(prev => ({ 
                          ...prev, 
                          recently: { ...prev.recently, isVisible: checked } 
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recently Posted Title
                    </label>
                    <Input
                      value={articlesData.recently.title}
                      onChange={(e) => 
                        setArticlesData(prev => ({ 
                          ...prev, 
                          recently: { ...prev.recently, title: e.target.value } 
                        }))
                      }
                      placeholder="Enter recently posted title"
                      className="max-w-2xl"
                    />
                  </div>
                </div>
              ),
            },
          ]}
        />

        <div className="mt-8 flex justify-end">
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={isLoading}
            onClick={handleSave}
            className="bg-[#1D69E1] hover:bg-[#164FA9] h-10 px-8 rounded-lg"
          >
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CMSArticles;