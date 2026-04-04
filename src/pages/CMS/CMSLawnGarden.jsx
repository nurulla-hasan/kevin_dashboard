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

const CMSLawnGarden = () => {
  const [activeTab, setActiveTab] = useState("banner");
  const [messageApi, contextHolder] = message.useMessage();

  const [lawnGardenData, setLawnGardenData] = useState({
    banner: {
      title: "An Interior Isn't Just A Space; It's Where Comfort Meets Craftsmanship.",
      isVisible: true,
    },
    projects: {
      title: "Interior Project Near You",
      isVisible: true,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Saving Lawn & Garden Data:", lawnGardenData);
      messageApi.success("Lawn & Garden settings saved successfully!");
    } catch {
      messageApi.error("Failed to save lawn & garden settings");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      {contextHolder}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Lawn & Garden Services Management</h1>
        <p className="text-gray-600">Manage lawn and garden services content and visibility</p>
      </div>

      <Card className="shadow-lg border-none">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: "banner",
              label: "Banner Section",
              children: (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-lg font-semibold">Banner Visibility</label>
                    <Switch
                      checked={lawnGardenData.banner.isVisible}
                      onChange={(checked) => 
                        setLawnGardenData(prev => ({ 
                          ...prev, 
                          banner: { ...prev.banner, isVisible: checked } 
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Banner Title
                    </label>
                    <Input.TextArea
                      value={lawnGardenData.banner.title}
                      onChange={(e) => 
                        setLawnGardenData(prev => ({ 
                          ...prev, 
                          banner: { ...prev.banner, title: e.target.value } 
                        }))
                      }
                      rows={3}
                      placeholder="Enter banner title"
                      className="max-w-2xl"
                    />
                  </div>
                </div>
              ),
            },
            {
              key: "projects",
              label: "Projects Section",
              children: (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-lg font-semibold">Projects Visibility</label>
                    <Switch
                      checked={lawnGardenData.projects.isVisible}
                      onChange={(checked) => 
                        setLawnGardenData(prev => ({ 
                          ...prev, 
                          projects: { ...prev.projects, isVisible: checked } 
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Projects Section Title
                    </label>
                    <Input
                      value={lawnGardenData.projects.title}
                      onChange={(e) => 
                        setLawnGardenData(prev => ({ 
                          ...prev, 
                          projects: { ...prev.projects, title: e.target.value } 
                        }))
                      }
                      placeholder="Enter projects section title"
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

export default CMSLawnGarden;