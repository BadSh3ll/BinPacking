import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Package, RefreshCw } from "lucide-react";
import useInstance from "@/context/instance/useInstance";

export default function InstanceParameters() {
    const { instance, params, setParams, generateInstance } = useInstance();

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-foreground">
                    <Package className="size-5 text-blue-600 dark:text-blue-400" />
                    Instance Parameters
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="numRectangles">Number of Rectangles</Label>
                    <Input
                        id="numRectangles"
                        type="number"
                        value={params.numRectangles}
                        onChange={(e) =>
                            setParams({
                                ...params,
                                numRectangles: parseInt(e.target.value),
                            })
                        }
                        min={1}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="minWidth">Min Width</Label>
                        <Input
                            id="minWidth"
                            type="number"
                            value={params.minWidth}
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    minWidth: parseInt(e.target.value),
                                })
                            }
                            min={1}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="maxWidth">Max Width</Label>
                        <Input
                            id="maxWidth"
                            type="number"
                            value={params.maxWidth}
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    maxWidth: parseInt(e.target.value),
                                })
                            }
                            min={params.minWidth}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="minHeight">Min Height</Label>
                        <Input
                            id="minHeight"
                            type="number"
                            value={params.minHeight}
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    minHeight: parseInt(e.target.value),
                                })
                            }
                            min={1}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="maxHeight">Max Height</Label>
                        <Input
                            id="maxHeight"
                            type="number"
                            value={params.maxHeight}
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    maxHeight: parseInt(e.target.value),
                                })
                            }
                            min={params.minHeight}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="boxSize">Box Size (L)</Label>
                    <Input
                        id="boxSize"
                        type="number"
                        value={params.boxSize}
                        onChange={(e) =>
                            setParams({
                                ...params,
                                boxSize: parseInt(e.target.value),
                            })
                        }
                        min={1}
                    />
                </div>

                {instance && (
                    <div>
                        {instance.rectangles
                            .slice(0, 10)
                            .map((rectangle, index) => (
                                <div key={index}>
                                    Rectangle {index + 1}: {rectangle.width} x{" "}
                                    {rectangle.height}
                                </div>
                            ))}
                        {instance.rectangles.length > 10 && (
                            <div>
                                ...and {instance.rectangles.length - 10} more
                            </div>
                        )}
                    </div>
                )}

                <Button onClick={generateInstance} className="w-full">
                    <RefreshCw className="size-4" />
                    Generate New Instance
                </Button>
            </CardContent>
        </Card>
    );
}
