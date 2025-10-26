import * as tf from '@tensorflow/tfjs'
import * as mobilenet from '@tensorflow-models/mobilenet'
let foodModel = null
let fallbackModel = null
const FOOD101_URL = '/models/food101/model.json'

const friendlyLabel = (raw) => raw?.replace(/_/g,' ').replace(/\b\w/g, c=>c.toUpperCase()) || 'Unknown'

export async function loadFoodModel(){
  if (foodModel) return foodModel
  try {
    foodModel = await tf.loadGraphModel(FOOD101_URL)
    return foodModel
  } catch(e){
    console.warn('Food-101 model not found, fallback to MobileNet', e)
    return null
  }
}
export async function loadFallbackModel(){
  if (fallbackModel) return fallbackModel
  fallbackModel = await mobilenet.load()
  return fallbackModel
}


export async function classifyImage(imgEl){
  const fm = await loadFoodModel()
  if (fm){
    const input = tf.tidy(()=>{
      const t = tf.browser.fromPixels(imgEl).toFloat()
      const resized = tf.image.resizeBilinear(t, [224,224])
      const norm = resized.div(255).expandDims(0)
      return norm
    })
    const logits = fm.predict(input)
    const probs = await logits.data()
    input.dispose(); logits.dispose()
    let topIdx=0, topProb=-1
    for (let i=0;i<probs.length;i++){ if (probs[i]>topProb){ topProb=probs[i]; topIdx=i } }
    const label = friendlyLabel(`Class ${topIdx}`)
    return { label, prob: topProb }
  }
  const mb = await loadFallbackModel()
  const preds = await mb.classify(imgEl)
  if (preds?.length) return { label: friendlyLabel(preds[0].className), prob: preds[0].probability }
  return { label: 'Unknown', prob: 0 }
}
